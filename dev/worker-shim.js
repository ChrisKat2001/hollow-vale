/* Learning-app shim: some webR files ship gzipped as <name>.gz.wasm. Unpack them on fetch. */
(function(){
  var GZ = { "R.wasm": "application/wasm", "libRblas.so": "application/octet-stream", "libRlapack.so": "application/octet-stream" };
  var realFetch = self.fetch.bind(self);
  self.fetch = async function(input, init){
    var url = typeof input === "string" ? input : (input && input.url) || String(input);
    var name = url.split("?")[0].split("/").pop();
    var path = url.split("?")[0];
    if (path.indexOf("/vfs/") >= 0) {
      if (/\.js\.metadata$/.test(path)) return realFetch(path + ".json", init);
      if (/\.data\.gz$/.test(path)) return realFetch(path + ".wasm", init);
    }
    if (!Object.prototype.hasOwnProperty.call(GZ, name)) return realFetch(input, init);
    var r = await realFetch(url + ".gz.wasm");
    if (!r.ok) throw new Error("Could not download " + name + " (HTTP " + r.status + ")");
    var buf = new Uint8Array(await r.arrayBuffer());
    if (buf[0] === 0x1f && buf[1] === 0x8b) {
      buf = new Uint8Array(await new Response(new Blob([buf]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer());
    }
    return new Response(buf, { status: 200, headers: { "Content-Type": GZ[name] } });
  };
  /* Synchronous XHRs from this worker bypass the service worker, so they fail offline.
     Prefetch those files with fetch() (which the service worker does serve) and answer
     matching XHRs from memory. Unknown or not-yet-loaded files fall back to the network. */
  var PRE = {};
  var base = self.location.href.replace(/[^/]*$/, "");
  ["libRlapack.so.wasm", "vfs/usr/lib/R/library/translations/DESCRIPTION.txt",
   "vfs/usr/lib/R/library/grDevices/afm.data.gz.wasm", "vfs/usr/lib/R/library/grDevices/enc.data.gz.wasm",
   "vfs/usr/lib/R/library/grDevices/afm.js.metadata.json", "vfs/usr/lib/R/library/grDevices/enc.js.metadata.json"].forEach(function(f){
    realFetch(base + f).then(function(r){ return r.ok ? r.arrayBuffer() : null; }).then(function(b){ if (b) PRE[base + f] = b; }).catch(function(){});
  });
  var realSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(){
    var hit = this.__url && PRE[this.__url];
    if (hit) {
      var buf = hit, self_ = this, bin = null;
      var def = function(k, v){ Object.defineProperty(self_, k, { configurable: true, get: function(){ return typeof v === "function" ? v() : v; } }); };
      def("readyState", 4); def("status", 200); def("statusText", "OK");
      def("response", function(){ return self_.responseType === "arraybuffer" ? buf : (bin || (bin = toBin(buf))); });
      def("responseText", function(){ return bin || (bin = toBin(buf)); });
      this.getResponseHeader = function(h){ return /content-length/i.test(h) ? String(buf.byteLength) : null; };
      this.getAllResponseHeaders = function(){ return "content-length: " + buf.byteLength + "\r\n"; };
      if (typeof this.onload === "function") { try { this.onload({ target: this }); } catch (e) {} }
      return;
    }
    return realSend.apply(this, arguments);
  };
  function toBin(b){ var u = new Uint8Array(b), s = "", CH = 0x8000; for (var i = 0; i < u.length; i += CH) s += String.fromCharCode.apply(null, u.subarray(i, i + CH)); return s; }
  var realOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url){
    var args = Array.prototype.slice.call(arguments);
    var u = String(url);
    var b = u.split("?")[0]; if (/\/DESCRIPTION$/.test(b)) args[1] = u + ".txt"; else if (/\/vfs\/.*\.js\.metadata$/.test(b)) args[1] = u + ".json"; else if (/\/vfs\/.*\.data\.gz$/.test(b)) args[1] = u + ".wasm"; else if (/\.so$/.test(b)) args[1] = u + ".wasm";
    try { this.__url = new URL(args[1], self.location.href).href.split("?")[0]; } catch (e) { this.__url = null; }
    return realOpen.apply(this, args);
  };
})();
