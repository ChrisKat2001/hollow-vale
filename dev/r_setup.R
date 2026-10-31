## ---------- Shared helpers (run once at boot) ----------
options(width = 70)
G <- new.env(parent = globalenv())

.friendly <- function(msg) {
  tip <- "Something went wrong. Read the message above."
  if (grepl("not found", msg) && grepl("object", msg)) tip <- "The DM doesn't know that name. Check spelling, or run the earlier step first."
  else if (grepl("could not find function", msg)) tip <- "That spell doesn't exist. Check the spellbook for the exact name."
  else if (grepl("undefined columns|subscript out of bounds", msg)) tip <- "That column doesn't exist. Column names are case-sensitive."
  else if (grepl("unexpected|parse", msg)) tip <- "The incantation is malformed. R points at where it got confused, but the mistake is often on the line just above. Check brackets, quotes and commas."
  else if (grepl("non-numeric|invalid 'type'", msg)) tip <- "A spell got the wrong kind of ingredient."
  paste0("Error: ", msg, "\n-> ", tip)
}

.theme <- function() {
  par(bg = "#efe6cf", fg = "#3b2a1a", col = "#3b2a1a", col.axis = "#5c4630", col.lab = "#3b2a1a",
      col.main = "#7a2418", col.sub = "#5c4630", family = "serif", font.main = 1, cex.main = 1.35,
      cex.lab = 1.1, cex.axis = 0.95, las = 1, bty = "l", tcl = -0.3, mgp = c(2.6, 0.6, 0),
      mar = c(4.2, 4.4, 3.2, 1.2))
  palette(c("#7a2418", "#d9a441", "#3e6b5a", "#4a5a8a", "#8a5a2a", "#6b4a7a", "#3b2a1a", "#a8743a"))
  invisible(NULL)
}
.run <- function(src) {
  out <- character(0); ok <- TRUE
  if (dev.cur() > 1) try(.theme(), silent = TRUE)
  exprs <- tryCatch(parse(text = src, keep.source = TRUE), error = function(e) e)
  if (inherits(exprs, "error")) {
    m <- conditionMessage(exprs)
    ln <- suppressWarnings(as.integer(sub("^<text>:(\\d+):.*", "\\1", strsplit(m, "\n")[[1]][1])))
    return(paste0("0\x01", .friendly(m), if (!is.na(ln)) paste0("\x02", ln) else ""))
  }
  refs <- attr(exprs, "srcref")
  for (k in seq_along(exprs)) {
    e <- exprs[[k]]
    res <- tryCatch({
      o <- capture.output(withCallingHandlers({
        v <- withVisible(eval(e, G))
        if (v$visible) print(v$value)
      }, warning = function(w) { cat("Warning:", conditionMessage(w), "\n"); invokeRestart("muffleWarning") }))
      list(ok = TRUE, o = o)
    }, error = function(err) list(ok = FALSE, o = .friendly(conditionMessage(err))))
    out <- c(out, res$o)
    if (!res$ok) {
      ok <- FALSE
      ln <- if (!is.null(refs) && length(refs) >= k) refs[[k]][1] else NA
      if (!is.na(ln)) return(paste0("0\x01", paste(out, collapse = "\n"), "\x02", ln))
      break
    }
  }
  paste0(if (ok) "1" else "0", "\x01", paste(out, collapse = "\n"))
}

.frames <- function() {
  n <- ls(G)
  n <- n[vapply(n, function(x) is.data.frame(get(x, envir = G)), logical(1))]
  paste(n, collapse = ",")
}
.peek <- function(name, max_rows = 500) {
  d <- get(name, envir = G)
  types <- vapply(d, function(col) if (is.factor(col)) "factor" else if (is.numeric(col)) "num" else if (is.logical(col)) "lgl" else "chr", character(1))
  h <- utils::head(d, max_rows)
  cells <- vapply(h, function(col) { v <- if (is.numeric(col)) format(col, digits = 4, trim = TRUE) else as.character(col); v[is.na(col)] <- "NA"; v }, character(nrow(h)))
  if (is.null(dim(cells))) cells <- matrix(cells, nrow = nrow(h))
  rows <- apply(cells, 1, function(r) paste(gsub("[\t\n]", " ", r), collapse = "\t"))
  paste(c(nrow(d), paste(names(d), collapse = "\t"), paste(types, collapse = "\t"), rows), collapse = "\n")
}

.say <- function(ok, msg) paste0(if (ok) "1" else "0", "\x01", msg)
.has <- function(name) exists(name, envir = G, inherits = FALSE)
.fields <- c("Ashgrove" = 0.4, "Briar Hollow" = 3.1, "Cinderfen" = 0.8, "Dunmere" = 5.2,
             "Elderbrook" = 2.3, "Foxmeadow" = 6.1, "Gallows End" = 1.5, "Hearthstone" = 4.4)

## ---------- Session 1: The Blighted Harvest ----------
.setup_s1 <- function() {
  G <<- new.env(parent = globalenv())
  set.seed(1983)
  n <- 6 * length(.fields)
  df <- data.frame(year = rep(1978:1983, each = length(.fields)),
                   field = rep(names(.fields), 6), stringsAsFactors = FALSE)
  df$rainfall_mm <- round(rnorm(n, 700, 90), 1)
  df$soil_ph <- round(rnorm(n, 6.5, 0.35), 2)
  df$mill_distance_km <- unname(.fields[df$field])
  df$yield_bushels <- round(38 + 7.5 * df$mill_distance_km + 0.012 * (df$rainfall_mm - 700) + rnorm(n, 0, 4), 1)
  .MISS <<- sort(sample(n, 6))
  df$rainfall_mm[.MISS] <- NA
  .ORIG <<- df
  assign("df", df, envir = G)
  invisible(TRUE)
}

.s1c1 <- function() {
  if (!.has("n_records")) return(.say(FALSE, "I don't see a variable called n_records yet."))
  n <- G$n_records
  if (!is.numeric(n) || length(n) != 1 || n != nrow(.ORIG))
    return(.say(FALSE, paste0("n_records is ", paste(format(n), collapse = " "), ". The ledger has more entries than that. Count every row of df.")))
  .say(TRUE, sprintf("The ledger holds %d entries: 8 fields over 6 years (1978-1983).", nrow(.ORIG)))
}
.s1c2 <- function() {
  if (!.has("clean")) return(.say(FALSE, "Store your repaired ledger in a variable called clean."))
  cl <- G$clean
  if (!is.data.frame(cl)) return(.say(FALSE, "clean should be a data frame."))
  if (nrow(cl) < nrow(.ORIG)) return(.say(FALSE, sprintf("The goblin laughs. You dropped rows and now clean has only %d of %d entries. Fill the gaps instead of throwing records away.", nrow(cl), nrow(.ORIG))))
  if (any(is.na(cl$rainfall_mm))) return(.say(FALSE, sprintf("%d gaps remain in rainfall_mm.", sum(is.na(cl$rainfall_mm)))))
  med <- median(.ORIG$rainfall_mm, na.rm = TRUE)
  if (!isTRUE(all.equal(cl$rainfall_mm[.MISS], rep(med, length(.MISS)))))
    return(.say(FALSE, sprintf("The gaps are filled, but not with the median (%.1f). Use median() with na.rm = TRUE.", med)))
  .say(TRUE, sprintf("All 6 gaps filled with the median rainfall, %.1f mm. The goblin is vanquished.", med))
}
.s1c3 <- function() {
  if (!.has("worst_field")) return(.say(FALSE, "Store the name of the weakest field in worst_field."))
  w <- G$worst_field
  avg <- tapply(G$clean$yield_bushels, G$clean$field, mean)
  exp <- names(which.min(avg))
  if (is.numeric(w)) return(.say(FALSE, "worst_field is a number, not a name. Wrap which.min() in names()."))
  if (length(w) != 1) return(.say(FALSE, "worst_field should be a single name, not a whole table."))
  if (!identical(unname(as.character(w)), exp)) return(.say(FALSE, paste0("'", w, "' is not the weakest field. Look again at the averages.")))
  .say(TRUE, sprintf("%s averages only %.1f bushels. The best field, %s, averages %.1f.", exp, min(avg), names(which.max(avg)), max(avg)))
}
.s1c4 <- function() {
  if (!.has("corrs")) return(.say(FALSE, "Store the correlations in a variable called corrs."))
  s <- G$corrs
  nums <- G$clean[sapply(G$clean, is.numeric)]
  exp <- cor(nums)[, "yield_bushels"]
  if (!is.numeric(s) || is.null(names(s))) return(.say(FALSE, "corrs should be one named column of the correlation matrix. Pick [, \"yield_bushels\"]."))
  if (!setequal(names(s), names(exp)) || !isTRUE(all.equal(unname(s[names(exp)]), unname(exp))))
    return(.say(FALSE, "Those numbers don't match the correlations of yield_bushels with the other columns."))
  .say(TRUE, "The Oracle's stone glows. Each number shows how strongly a column moves with the harvest.")
}
.s1c5 <- function() {
  if (!.has("culprit")) return(.say(FALSE, "Name the culprit column in a variable called culprit."))
  cc <- G$culprit
  nums <- G$clean[sapply(G$clean, is.numeric)]
  corr <- cor(nums)[, "yield_bushels"]
  corr <- corr[!names(corr) %in% c("yield_bushels", "year")]
  exp <- names(which.max(abs(corr)))
  if (identical(cc, "rainfall_mm")) return(.say(FALSE, "Rainfall is a red herring. Its correlation is weak. Look for the strongest link, positive or negative."))
  if (!identical(unname(as.character(cc)), exp)) return(.say(FALSE, paste0("'", paste(cc, collapse = " "), "' is not the strongest link. Compare the absolute values.")))
  .say(TRUE, sprintf("%s has a correlation of %.2f with the harvest. The fields closest to the Old Mill fail the most.", exp, corr[[exp]]))
}

## ---------- Session 2: Trial at the Old Mill ----------
.setup_s2 <- function() {
  G <<- new.env(parent = globalenv())
  set.seed(1972)
  years <- 1972:1983
  ledger <- data.frame(year = rep(years, each = length(.fields)),
                       field = rep(names(.fields), length(years)), stringsAsFactors = FALSE)
  n <- nrow(ledger)
  ledger$mill_distance_km <- unname(.fields[ledger$field])
  ledger$rainfall_mm <- round(rnorm(n, 700, 90), 1)
  after <- ledger$year >= 1978
  shadow <- 45 * exp(-ledger$mill_distance_km / 1.2)
  base <- 78 + 1 * ledger$mill_distance_km - ifelse(after, shadow, 0)
  ledger$yield_bushels <- round(base + 0.012 * (ledger$rainfall_mm - 700) + rnorm(n, 0, 4), 1)
  .LEDGER <<- ledger
  dist <- round(runif(24, 0.3, 1.5), 1)
  grp <- sample(rep(c("diverted", "control"), 12))
  trial <- data.frame(plot = sprintf("P%02d", 1:24), mill_distance_km = dist, group = grp, stringsAsFactors = FALSE)
  trial$yield_bushels <- round(78 + dist - ifelse(grp == "diverted", 0.2, 1) * 45 * exp(-dist / 1.2) + rnorm(24, 0, 6), 1)
  .TRIAL <<- trial
  assign("ledger", ledger, envir = G)
  assign("trial", trial, envir = G)
  invisible(TRUE)
}

.s2c1 <- function(nimg) {
  src <- if (exists(".src")) .src else ""
  if (nimg < 1) return(.say(FALSE, "No vision appeared. Use plot() to draw the ledger."))
  if (!grepl("mill_distance_km", src) || !grepl("yield_bushels", src))
    return(.say(FALSE, "You drew something, but the Seer asked for yield_bushels against mill_distance_km."))
  .say(TRUE, "The vision shows a rising cloud. Further from the mill, bigger harvests. But look closer. Some near fields once did well.")
}
.s2c2 <- function() {
  L <- G$ledger
  if (is.null(L$period)) return(.say(FALSE, "Add a column called period to ledger."))
  if (is.null(L$zone)) return(.say(FALSE, "Add a column called zone to ledger."))
  ep <- ifelse(.LEDGER$year < 1978, "before", "after")
  ez <- ifelse(.LEDGER$mill_distance_km < 2, "near", "far")
  if (!identical(as.character(L$period), ep)) return(.say(FALSE, "period is not right. Years before 1978 are \"before\", the rest are \"after\"."))
  if (!identical(as.character(L$zone), ez)) return(.say(FALSE, "zone is not right. Fields under 2 km from the mill are \"near\", the rest are \"far\"."))
  .say(TRUE, sprintf("Every entry is tagged. %d near and %d far entries, split around 1978, the year the mill woke.", sum(ez == "near"), sum(ez == "far")))
}
.s2c3 <- function() {
  if (!.has("means")) return(.say(FALSE, "Store the table of averages in a variable called means."))
  m <- G$means
  L <- G$ledger
  exp <- tapply(L$yield_bushels, list(L$zone, L$period), mean)
  if (!is.matrix(m) || !all(dim(m) == c(2, 2))) return(.say(FALSE, "means should be a 2 x 2 table: zone by period. Pass both columns to tapply() inside list()."))
  if (!isTRUE(all.equal(m[rownames(exp), colnames(exp)], exp, check.attributes = FALSE)))
    return(.say(FALSE, "Those averages don't match. Use list(ledger$zone, ledger$period) as the groups."))
  dn <- exp["near", "after"] - exp["near", "before"]
  df <- exp["far", "after"] - exp["far", "before"]
  .say(TRUE, sprintf("Near fields changed by %+.1f bushels after 1978. Far fields changed by %+.1f. The gap between those, %.1f, is the mill's shadow.", dn, df, dn - df))
}
.s2c4 <- function() {
  if (!.has("p_value")) return(.say(FALSE, "Store the p-value in a variable called p_value."))
  p <- G$p_value
  exp <- t.test(yield_bushels ~ group, data = .TRIAL)$p.value
  if (!is.numeric(p) || length(p) != 1) return(.say(FALSE, "p_value should be one number. Take it from result$p.value."))
  if (!isTRUE(all.equal(p, exp))) return(.say(FALSE, "That number isn't the p-value of the t-test on trial. Compare yield_bushels by group."))
  .say(TRUE, sprintf("p = %s. If the stream made no difference, a gap this large would almost never happen by luck.", format.pval(exp, digits = 2)))
}
.s2c5 <- function() {
  if (!.has("effect")) return(.say(FALSE, "Store the difference in a variable called effect."))
  if (!.has("verdict")) return(.say(FALSE, "Store your ruling in a variable called verdict."))
  e <- G$effect; v <- G$verdict
  exp <- mean(.TRIAL$yield_bushels[.TRIAL$group == "diverted"]) - mean(.TRIAL$yield_bushels[.TRIAL$group == "control"])
  if (!is.numeric(e) || !isTRUE(all.equal(e, exp))) {
    if (is.numeric(e) && isTRUE(all.equal(e, -exp))) return(.say(FALSE, "Right size, wrong sign. Subtract control from diverted."))
    return(.say(FALSE, "effect should be the mean of diverted plots minus the mean of control plots."))
  }
  if (identical(v, "luck")) return(.say(FALSE, "The Rotwarden grins. But your p-value is far below 0.05. Luck is not a good explanation here."))
  if (!identical(v, "mill")) return(.say(FALSE, "verdict should be \"mill\" or \"luck\"."))
  .say(TRUE, sprintf("Diverted plots grew %.1f more bushels on average. The trial was random, so the mill is the cause.", exp))
}

.check <- function(session, step, nimg = 0) {
  f <- get0(sprintf(".%sc%d", session, step))
  if (is.null(f)) return(.say(FALSE, "No check for this step."))
  tryCatch(if ("nimg" %in% names(formals(f))) f(nimg) else f(),
           error = function(e) .say(FALSE, paste("The check itself stumbled:", conditionMessage(e))))
}

## ---------- Session 0: The Apprentice's Tower (optional R intro) ----------
.setup_s0 <- function() {
  G <<- new.env(parent = globalenv())
  roster <- data.frame(
    name = c("Ada", "Bram", "Cleo", "Dov", "Esme", "Finn"),
    house = c("Owl", "Raven", "Owl", "Stag", "Raven", "Stag"),
    age = c(17, 19, 18, 22, 20, 18),
    score = c(71, 64, 88, 59, 93, 77),
    stringsAsFactors = FALSE)
  .ROSTER <<- roster
  assign("roster", roster, envir = G)
  invisible(TRUE)
}
.num1 <- function(name, target, label) {
  if (!.has(name)) return(.say(FALSE, sprintf("I don't see a variable called %s yet.", name)))
  v <- G[[name]]
  if (!is.numeric(v) || length(v) != 1) return(.say(FALSE, sprintf("%s should be one number.", name)))
  if (!isTRUE(all.equal(v, target))) return(.say(FALSE, sprintf("%s is %s. %s", name, format(v), label)))
  NULL
}
.s0c1 <- function() {
  r <- .num1("root", 12, "The square root of 144 is a smaller number. Put 144 inside sqrt().")
  if (!is.null(r)) return(r)
  .say(TRUE, "root is 12. R answers instantly. Every line you type is a question, and R replies.")
}
.s0c2 <- function() {
  r <- .num1("left", 26, "You start with 50 gold and buy 3 potions at 8 gold each.")
  if (!is.null(r)) return(r)
  .say(TRUE, "26 gold left. You named your numbers, so the calculation reads like a sentence.")
}
.s0c3 <- function() {
  r <- .num1("avg_hit", 5.4, "Use mean() on hits.")
  if (!is.null(r)) return(r)
  r <- .num1("n_hits", 5, "Use length() on hits to count the strikes.")
  if (!is.null(r)) return(r)
  .say(TRUE, "Five strikes with an average of 5.4. One name, many values. That is a vector.")
}
.s0c4 <- function() {
  r <- .num1("top_score", max(.ROSTER$score), "Take the largest value of the score column.")
  if (!is.null(r)) return(r)
  .say(TRUE, sprintf("The top score is %d, by %s. A data frame is a table, and $ opens one of its columns.", max(.ROSTER$score), .ROSTER$name[which.max(.ROSTER$score)]))
}
.s0c5 <- function() {
  r <- .num1("total", 16, "total should be the sum of potion.")
  if (!is.null(r)) return(r)
  r <- .num1("average", 16 / 3, "average should be the mean of potion.")
  if (!is.null(r)) return(r)
  .say(TRUE, "The scroll is mended. You read each error, found the line, and fixed it. That is most of programming.")
}

## ---------- Session 3: The Vanishing Customers (Merchant's Port) ----------
.setup_s3 <- function() {
  G <<- new.env(parent = globalenv())
  set.seed(1984)
  n <- 400
  guild <- data.frame(customer_id = sprintf("C%03d", 1:n), stringsAsFactors = FALSE)
  guild$district <- sample(c("Docks", "Market", "Hill"), n, replace = TRUE, prob = c(0.4, 0.35, 0.25))
  guild$tenure_months <- round(rgamma(n, shape = 2, scale = 10))
  guild$visits <- rpois(n, 6)
  guild$avg_spend <- round(rlnorm(n, log(40), 0.4), 1)
  guild$complaints <- rpois(n, 0.7)
  guild$loyalty <- sample(c("yes", "no"), n, replace = TRUE, prob = c(0.45, 0.55))
  lp <- 0.9 - 0.04 * guild$tenure_months - 0.28 * guild$visits + 0.75 * guild$complaints -
        1.0 * (guild$loyalty == "yes") + 0.3 * (guild$district == "Docks")
  guild$left <- rbinom(n, 1, plogis(lp))
  .GUILD <<- guild
  assign("guild", guild, envir = G)
  invisible(TRUE)
}
.s3model <- function() glm(left ~ visits + complaints + loyalty + tenure_months, family = binomial, data = .GUILD)

.s3c1 <- function() {
  r <- .num1("churn_rate", mean(.GUILD$left), "The mean of a 0/1 column is the share of 1s. Use mean() on guild$left.")
  if (!is.null(r)) return(r)
  if (!.has("rate_by_seal")) return(.say(FALSE, "Store the churn rate per loyalty group in rate_by_seal."))
  exp <- tapply(.GUILD$left, .GUILD$loyalty, mean)
  v <- G$rate_by_seal
  if (is.null(names(v)) || !setequal(names(v), names(exp)) || !isTRUE(all.equal(as.numeric(v[names(exp)]), as.numeric(exp))))
    return(.say(FALSE, "rate_by_seal should hold the mean of left for each loyalty group. Group by guild$loyalty."))
  .say(TRUE, sprintf("%.0f%% of customers left last season. Without a loyalty seal: %.0f%%. With one: %.0f%%.", 100 * mean(.GUILD$left), 100 * exp[["no"]], 100 * exp[["yes"]]))
}
.s3c2 <- function(nimg) {
  if (nimg < 1) return(.say(FALSE, "No vision appeared. Draw a boxplot of visits by left."))
  if (!.has("mean_visits")) return(.say(FALSE, "Store the average visits for stayers and leavers in mean_visits."))
  exp <- tapply(.GUILD$visits, .GUILD$left, mean)
  v <- G$mean_visits
  if (length(v) != 2 || !isTRUE(all.equal(as.numeric(v), as.numeric(exp))))
    return(.say(FALSE, "mean_visits should be the mean of visits for each value of left."))
  .say(TRUE, sprintf("Stayers visited %.1f times on average. Leavers only %.1f. People drift away before they leave.", exp[["0"]], exp[["1"]]))
}
.s3c3 <- function() {
  if (!.has("model")) return(.say(FALSE, "Store your model in a variable called model."))
  m <- G$model
  if (!inherits(m, "glm")) return(.say(FALSE, "model should come from glm()."))
  if (m$family$family != "binomial") return(.say(FALSE, "For a yes/no outcome, use family = binomial."))
  need <- c("visits", "complaints", "loyalty", "tenure_months")
  have <- attr(terms(m), "term.labels")
  miss <- setdiff(need, have)
  if (length(miss)) return(.say(FALSE, paste0("The model is missing: ", paste(miss, collapse = ", "), ".")))
  if (as.character(formula(m))[2] != "left") return(.say(FALSE, "The outcome on the left of ~ should be left."))
  .say(TRUE, "The Augur's model is ready. Each coefficient shows how a trait shifts the log-odds of leaving.")
}
.s3c4 <- function() {
  if (!.has("odds")) return(.say(FALSE, "Store the odds ratios in a variable called odds."))
  m <- .s3model()
  exp_odds <- exp(coef(m))
  o <- G$odds
  if (is.null(names(o)) || !all(names(exp_odds) %in% names(o)) || !isTRUE(all.equal(as.numeric(o[names(exp_odds)]), as.numeric(exp_odds), tolerance = 1e-6)))
    return(.say(FALSE, "odds should be exp() of the model's coefficients."))
  if (!.has("worst")) return(.say(FALSE, "Store the name of the trait that raises the odds most in worst."))
  w <- G$worst
  top <- names(which.max(exp_odds[-1]))
  if (!identical(unname(as.character(w)), top)) return(.say(FALSE, paste0("'", paste(w, collapse = " "), "' is not the trait with the largest odds ratio. Ignore the intercept.")))
  .say(TRUE, sprintf("Each extra complaint multiplies the odds of leaving by %.2f. A loyalty seal multiplies them by %.2f.", exp_odds[["complaints"]], exp_odds[["loyaltyyes"]]))
}
.s3c5 <- function() {
  L <- G$guild
  if (is.null(L$risk)) return(.say(FALSE, "Add a column called risk to guild with the predicted probabilities."))
  exp_risk <- predict(.s3model(), type = "response")
  if (!isTRUE(all.equal(as.numeric(L$risk), as.numeric(exp_risk), tolerance = 1e-6)))
    return(.say(FALSE, "risk should be probabilities between 0 and 1. Use type = \"response\" in predict()."))
  if (!.has("save_list")) return(.say(FALSE, "Store the 20 customers with the highest risk in save_list."))
  top20 <- .GUILD$customer_id[order(exp_risk, decreasing = TRUE)][1:20]
  s <- G$save_list
  if (length(s) != 20) return(.say(FALSE, sprintf("save_list has %d names. The guild can only visit 20.", length(s))))
  if (!setequal(as.character(s), top20)) return(.say(FALSE, "Those are not the 20 riskiest customers. Sort by risk, from high to low."))
  .say(TRUE, sprintf("Twenty names on the scroll. Their average risk of leaving is %.0f%%. The guild's average is %.0f%%.", 100 * mean(sort(exp_risk, decreasing = TRUE)[1:20]), 100 * mean(exp_risk)))
}

## ---------- Session 4: The Tower of Seasons (time series) ----------
.setup_s4 <- function() {
  G <<- new.env(parent = globalenv())
  set.seed(1977)
  n <- 72
  t <- 1:n
  m <- ((t - 1) %% 12) + 1
  season <- c(38, 30, 18, 4, -10, -22, -28, -24, -10, 6, 22, 36)
  almanac <- data.frame(t = t, year = 1977 + (t - 1) %/% 12,
                        month = factor(month.abb[m], levels = month.abb))
  almanac$oil_barrels <- round(200 + 1.6 * t + season[m] + rnorm(n, 0, 8))
  .ALM <<- almanac
  assign("almanac", almanac, envir = G)
  invisible(TRUE)
}
.s4fit <- function() lm(oil_barrels ~ t + month, data = .ALM)
.s4c1 <- function(nimg) {
  src <- if (exists(".src")) .src else ""
  if (nimg < 1) return(.say(FALSE, "No vision appeared. Use plot() to draw the almanac."))
  if (!grepl("oil_barrels", src)) return(.say(FALSE, "Plot oil_barrels over time."))
  if (!grepl("type\\s*=\\s*[\"']l[\"']", src)) return(.say(FALSE, "Dots hide the rhythm. Use type = \"l\" to draw a line."))
  .say(TRUE, "A rising line with a wave every year. Two patterns at once: a trend and a season.")
}
.s4c2 <- function() {
  if (!.has("by_month")) return(.say(FALSE, "Store the average per month in by_month."))
  exp <- tapply(.ALM$oil_barrels, .ALM$month, mean)
  v <- G$by_month
  if (length(v) != 12 || !isTRUE(all.equal(as.numeric(v), as.numeric(exp)))) return(.say(FALSE, "by_month should hold the mean of oil_barrels for each month."))
  if (!.has("peak_month")) return(.say(FALSE, "Store the name of the busiest month in peak_month."))
  pk <- names(which.max(exp))
  if (!identical(unname(as.character(G$peak_month)), pk)) return(.say(FALSE, "That is not the month with the highest average. Use names(which.max(...))."))
  .say(TRUE, sprintf("%s is the peak, with %.0f barrels on average. %s is the quietest, with %.0f.", pk, max(exp), names(which.min(exp)), min(exp)))
}
.s4c3 <- function(nimg) {
  A <- G$almanac
  if (is.null(A$ma12)) return(.say(FALSE, "Add a column ma12 to almanac with the 12-month moving average."))
  exp <- as.numeric(stats::filter(.ALM$oil_barrels, rep(1 / 12, 12), sides = 2))
  if (!isTRUE(all.equal(as.numeric(A$ma12), exp))) return(.say(FALSE, "ma12 is not a 12-month moving average. Average 12 neighbours, each with weight 1/12."))
  if (nimg < 1) return(.say(FALSE, "The average is right. Now draw it: plot the oil, then add the average with lines()."))
  .say(TRUE, "The season melts away and the trend remains. Twelve months always contain every season exactly once.")
}
.s4c4 <- function() {
  if (!.has("fit")) return(.say(FALSE, "Store your model in fit."))
  f <- G$fit
  if (!inherits(f, "lm")) return(.say(FALSE, "fit should come from lm()."))
  have <- attr(terms(f), "term.labels")
  if (!all(c("t", "month") %in% have)) return(.say(FALSE, "The model needs both t (the trend) and month (the season)."))
  if (!.has("growth")) return(.say(FALSE, "Store the coefficient of t in growth."))
  g <- as.numeric(G$growth)
  exp <- coef(.s4fit())[["t"]]
  if (length(g) != 1 || !isTRUE(all.equal(g, exp))) return(.say(FALSE, "growth should be the coefficient of t: coef(fit)[\"t\"]."))
  .say(TRUE, sprintf("The tower burns %.2f more barrels each month than the month before, on top of the seasons. That's about %.0f more per year.", exp, 12 * exp))
}
.s4c5 <- function() {
  if (!.has("forecast")) return(.say(FALSE, "Store the 12 predictions in forecast."))
  fut <- data.frame(t = 73:84, month = factor(month.abb, levels = month.abb))
  exp <- predict(.s4fit(), newdata = fut)
  fc <- G$forecast
  if (length(fc) != 12 || !isTRUE(all.equal(as.numeric(fc), as.numeric(exp)))) return(.say(FALSE, "forecast should be predict(fit, newdata = future) for months 73 to 84."))
  if (!.has("order_total")) return(.say(FALSE, "Store the total of the forecast in order_total."))
  if (!isTRUE(all.equal(as.numeric(G$order_total), sum(exp)))) return(.say(FALSE, "order_total should be the sum of the 12 forecasts."))
  .say(TRUE, sprintf("Order %.0f barrels for 1983. The busiest month will be %s, with about %.0f.", sum(exp), month.abb[which.max(exp)], max(exp)))
}

## ---------- Session 5: The Overfitting Hydra (validation) ----------
.setup_s5 <- function() {
  G <<- new.env(parent = globalenv())
  set.seed(1985)
  n <- 60
  brews <- data.frame(moonleaf = round(runif(n, 0, 10), 1))
  noise <- c("troll_sweat", "newt_eyes", "mandrake", "frost_salt", "ember_dust", "bog_water",
             "raven_quill", "wolfsbane", "glowcap", "ashroot", "dragonmoss", "toadstool",
             "fairy_ink", "nightshade", "pixie_dust", "kraken_ink", "sunpetal", "saltpeter",
             "goblin_ash", "owl_feather", "moss_water", "bone_meal", "starlight", "thistle")
  for (v in noise) brews[[v]] <- round(runif(n, 0, 10), 1)
  brews$potency <- round(10 + 3 * brews$moonleaf + rnorm(n, 0, 3), 1)
  .BREWS <<- brews
  assign("brews", brews, envir = G)
  invisible(TRUE)
}
.s5c1 <- function() {
  if (!.has("m_simple")) return(.say(FALSE, "Store the one-ingredient model in m_simple."))
  m <- G$m_simple
  if (!inherits(m, "lm") || !identical(attr(terms(m), "term.labels"), "moonleaf")) return(.say(FALSE, "m_simple should be lm(potency ~ moonleaf, data = brews)."))
  r <- .num1("r2_simple", summary(lm(potency ~ moonleaf, data = .BREWS))$r.squared, "Take r.squared from summary(m_simple).")
  if (!is.null(r)) return(r)
  .say(TRUE, sprintf("Moonleaf alone explains %.0f%% of the variation in potency.", 100 * G$r2_simple))
}
.s5c2 <- function() {
  if (!.has("m_all")) return(.say(FALSE, "Store the everything model in m_all."))
  m <- G$m_all
  if (!inherits(m, "lm") || length(attr(terms(m), "term.labels")) != ncol(.BREWS) - 1) return(.say(FALSE, "m_all should use every ingredient. The dot in potency ~ . means “all other columns”."))
  exp <- summary(lm(potency ~ ., data = .BREWS))$r.squared
  r <- .num1("r2_all", exp, "Take r.squared from summary(m_all).")
  if (!is.null(r)) return(r)
  .say(TRUE, sprintf("R² rose from %.2f to %.2f. %d ingredients that do nothing still made the model look better.", summary(lm(potency ~ moonleaf, data = .BREWS))$r.squared, exp, ncol(.BREWS) - 2))
}
.s5c3 <- function() {
  if (!.has("train") || !.has("test")) return(.say(FALSE, "Create both train and test."))
  tr <- G$train; te <- G$test
  if (!is.data.frame(tr) || !is.data.frame(te)) return(.say(FALSE, "train and test should be data frames."))
  if (nrow(tr) != 40 || nrow(te) != 20) return(.say(FALSE, sprintf("train has %d rows and test has %d. Aim for 40 and 20.", nrow(tr), nrow(te))))
  ids <- c(rownames(tr), rownames(te))
  if (any(duplicated(ids)) || !setequal(ids, rownames(.BREWS))) return(.say(FALSE, "Every brew must be in exactly one of train or test. Use idx for one and -idx for the other."))
  .say(TRUE, "40 brews to learn from. 20 brews locked away, which the models will never see while learning.")
}
.rmse_ <- function(a, b) sqrt(mean((a - b)^2))
.s5c4 <- function() {
  tr <- G$train; te <- G$test
  s <- lm(potency ~ moonleaf, data = tr); a <- lm(potency ~ ., data = tr)
  es <- .rmse_(te$potency, predict(s, te)); ea <- .rmse_(te$potency, predict(a, te))
  r <- .num1("rmse_simple", es, "Fit potency ~ moonleaf on train, predict on test, and compare with test$potency.")
  if (!is.null(r)) return(r)
  r <- .num1("rmse_all", ea, "Fit potency ~ . on train, predict on test, and compare with test$potency.")
  if (!is.null(r)) return(r)
  .say(TRUE, sprintf("On unseen brews, the simple model misses by %.1f on average. The everything model misses by %.1f.", es, ea))
}
.s5c5 <- function() {
  tr <- G$train; te <- G$test
  a <- lm(potency ~ ., data = tr); s <- lm(potency ~ moonleaf, data = tr)
  etr <- .rmse_(tr$potency, fitted(a))
  r <- .num1("train_all", etr, "Compute the RMSE of m_all on the training brews: compare train$potency with fitted values.")
  if (!is.null(r)) return(r)
  es <- .rmse_(te$potency, predict(s, te)); ea <- .rmse_(te$potency, predict(a, te))
  best <- if (es < ea) "simple" else "all"
  if (!.has("champion")) return(.say(FALSE, "Store your choice, \"simple\" or \"all\", in champion."))
  if (!identical(G$champion, best)) return(.say(FALSE, "The Hydra laughs. Judge the models by their test error, not their training error."))
  .say(TRUE, sprintf("The everything model misses by only %.1f on brews it has seen, but by %.1f on new ones. The simple model wins where it counts.", etr, ea))
}

## ---------- Session 6: The Guild Census (hierarchical clustering) ----------
.setup_s6 <- function() {
  G <<- new.env(parent = globalenv())
  set.seed(1986)
  mk <- function(n, v, b, l, m) data.frame(
    visits_per_month = pmax(0, round(rnorm(n, v[1], v[2]), 1)),
    basket_gold = pmax(1, round(rnorm(n, b[1], b[2]))),
    luxury_share = pmin(1, pmax(0, round(rnorm(n, l[1], l[2]), 2))),
    months_member = pmax(1, round(rnorm(n, m[1], m[2]))))
  members <- rbind(
    mk(26, c(9, 1.6), c(18, 6), c(0.08, 0.05), c(40, 12)),
    mk(16, c(2.5, 0.9), c(140, 28), c(0.7, 0.1), c(55, 14)),
    mk(18, c(3.5, 1.1), c(45, 12), c(0.25, 0.08), c(5, 3)))
  members <- members[sample(nrow(members)), ]
  rownames(members) <- NULL
  members <- cbind(member = sprintf("M%02d", seq_len(nrow(members))), members, stringsAsFactors = FALSE)
  .MEM <<- members
  assign("members", members, envir = G)
  invisible(TRUE)
}
.s6vars <- c("visits_per_month", "basket_gold", "luxury_share", "months_member")
.s6tree <- function() hclust(dist(scale(.MEM[, .s6vars])), method = "ward.D2")
.s6c1 <- function(nimg) {
  src <- if (exists(".src")) .src else ""
  if (nimg < 1) return(.say(FALSE, "No vision appeared. Plot basket_gold against visits_per_month."))
  if (!grepl("visits_per_month", src) || !grepl("basket_gold", src)) return(.say(FALSE, "Plot basket_gold against visits_per_month."))
  .say(TRUE, "Three clouds of members. Frequent small spenders, rare big spenders, and a group in between.")
}
.s6c2 <- function() {
  if (!.has("X")) return(.say(FALSE, "Store the scaled numbers in X."))
  X <- G$X
  if (!is.matrix(X) || ncol(X) != 4) return(.say(FALSE, "X should hold the 4 numeric columns, passed through scale()."))
  if (!isTRUE(all.equal(unname(colMeans(X)), rep(0, 4), tolerance = 1e-6)) || !isTRUE(all.equal(unname(apply(X, 2, sd)), rep(1, 4), tolerance = 1e-6)))
    return(.say(FALSE, "The columns aren't standardised yet. Wrap them in scale()."))
  exp <- scale(.MEM[, .s6vars])
  if (!isTRUE(all.equal(unname(X), unname(exp)))) return(.say(FALSE, "Use exactly these columns: visits_per_month, basket_gold, luxury_share, months_member."))
  .say(TRUE, "Every column now has mean 0 and standard deviation 1. A gold coin and a visit finally weigh the same.")
}
.s6c3 <- function(nimg) {
  if (!.has("tree")) return(.say(FALSE, "Store the result of hclust() in tree."))
  t <- G$tree
  if (!inherits(t, "hclust")) return(.say(FALSE, "tree should come from hclust()."))
  if (!identical(t$method, "ward.D2")) return(.say(FALSE, "Use method = \"ward.D2\"."))
  if (!isTRUE(all.equal(t$height, .s6tree()$height))) return(.say(FALSE, "The tree doesn't match. Build it from dist(X), with X the scaled data."))
  if (nimg < 1) return(.say(FALSE, "The tree is grown. Now draw it with plot(tree)."))
  .say(TRUE, "The family tree of the guild. Members who shop alike join low down. Very different groups only join at the top.")
}
.s6c4 <- function() {
  M <- G$members
  if (is.null(M$segment)) return(.say(FALSE, "Add a column called segment to members."))
  exp <- cutree(.s6tree(), k = 3)
  if (length(unique(M$segment)) != 3) return(.say(FALSE, sprintf("You made %d segments. Cut the tree into 3.", length(unique(M$segment)))))
  if (!isTRUE(all.equal(as.integer(M$segment), as.integer(exp)))) return(.say(FALSE, "Those segments don't match the tree. Use cutree(tree, k = 3)."))
  tb <- table(exp)
  .say(TRUE, sprintf("Three segments of %s members. The DM nods: the cut sits where the branches are longest.", paste(as.integer(tb), collapse = ", ")))
}
.s6c5 <- function() {
  if (!.has("profile")) return(.say(FALSE, "Store the averages per segment in profile."))
  pr <- G$profile
  if (!is.data.frame(pr) || is.null(pr$segment) || nrow(pr) != 3) return(.say(FALSE, "profile should be a data frame with one row per segment, from aggregate()."))
  M <- .MEM; M$segment <- cutree(.s6tree(), k = 3)
  exp <- aggregate(cbind(visits_per_month, basket_gold, luxury_share, months_member) ~ segment, data = M, FUN = mean)
  for (v in .s6vars) if (is.null(pr[[v]]) || !isTRUE(all.equal(pr[[v]][order(pr$segment)], exp[[v]]))) return(.say(FALSE, paste0("The average of ", v, " per segment is missing or wrong.")))
  if (!.has("nobles")) return(.say(FALSE, "Store the number of the segment with the highest luxury_share in nobles."))
  top <- exp$segment[which.max(exp$luxury_share)]
  if (!isTRUE(as.numeric(G$nobles) == top)) return(.say(FALSE, "That is not the segment with the highest luxury_share."))
  .say(TRUE, sprintf("Segment %d are the Nobles: about %.0f gold per basket, %.0f%% luxury goods, but only %.1f visits a month.", top, exp$basket_gold[top], 100 * exp$luxury_share[top], exp$visits_per_month[top]))
}

## ---------- Story Mode (stories written by a human DM) ----------
.setup_story <- function(csv, name) {
  G <<- new.env(parent = globalenv())
  if (nzchar(csv)) {
    d <- utils::read.csv(text = csv, stringsAsFactors = FALSE, check.names = TRUE)
    assign(if (nzchar(name)) make.names(name) else "data", d, envir = G)
  }
  invisible(TRUE)
}
.check_story <- function(expr, fail_msg, nimg) {
  if (!nzchar(trimws(expr))) return(.say(TRUE, "The DM set no check for this step. Well cast."))
  env <- new.env(parent = G)
  env$n_plots <- nimg
  v <- tryCatch(eval(parse(text = expr), env), error = function(e) structure(conditionMessage(e), class = "check_error"))
  if (inherits(v, "check_error")) return(.say(FALSE, paste0("Not yet. (The check needs something that isn't there yet: ", v, ")")))
  if (isTRUE(v)) return(.say(TRUE, "The DM nods. That's exactly it."))
  if (is.character(v) && length(v) == 1) return(.say(FALSE, v))
  .say(FALSE, if (nzchar(fail_msg)) fail_msg else "Not quite. Read the task again, or roll for a hint.")
}
