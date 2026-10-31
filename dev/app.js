"use strict";

/* ---------- Campaign content ---------- */
const CLASSES = [
  { id: "mage", name: "Data Mage", blurb: "Bends numbers to their will.", bonus: "modeling" },
  { id: "ranger", name: "Ranger of Records", blurb: "Tracks every row through the wild.", bonus: "wrangling" },
  { id: "seer", name: "Seer of Charts", blurb: "Sees patterns others miss.", bonus: "sight" },
];
const STAT_NAMES = { wrangling: "Wrangling", sight: "Sight", modeling: "Modeling", wisdom: "Wisdom" };

const SESSIONS = [
  {
    id: "s0", npc: "thessaly", num: 0, title: "The Apprentice's Tower", place: "Apprentice's Tower", topic: "Optional · first steps in R", optional: true, xp: 50,
    chapters: [
      {
        id: 1, short: "I · First Words", title: "Chapter I · The First Incantation", stat: "wisdom",
        story: [
          "Before Millbrook, there is the Tower. Old Master Thessaly peers at you over her spectacles. <em>“You want to read the patterns of the world? Then first learn to speak to it.”</em>",
          "<em>“R is the tongue we use. Ask it a question, and it answers. Try a sum. Then ask for a square root.”</em>",
        ],
        task: "Type any number into the first blank to ask R a sum. Then store the square root of 144 in <code>root</code>.",
        starter: "# Lines starting with # are notes. R ignores them.\n12 + ____\n\nroot <- sqrt(____)\nroot",
        hint: "<code>sqrt()</code> takes the number inside its brackets. Try <code>sqrt(144)</code>.",
        lesson: "<b>Lesson:</b> R works like a very smart calculator. A function such as <code>sqrt()</code> takes an input in brackets and returns an answer. Typing a name on its own line, like <code>root</code>, prints it.",
        fix: "root <- sqrt(144)", keyVar: "root",
      },
      {
        id: 2, short: "II · Names", title: "Chapter II · Naming Things", stat: "wisdom",
        story: [
          "<em>“Numbers are slippery,”</em> Thessaly says. <em>“Give them names, and they stay put.”</em>",
          "You have 50 gold. The Tower shop sells healing potions for 8 gold each. You buy 3.",
        ],
        task: "Fill in the blank so that <code>left</code> holds the gold you have left after buying 3 potions.",
        starter: "gold <- 50\nprice <- 8\n\n# The arrow <- stores the result under a name\nleft <- gold - ____ * price\nleft",
        hint: "You bought <code>3</code> potions. Multiply that by <code>price</code>.",
        lesson: "<b>Lesson:</b> <code>name &lt;- value</code> stores a value. Read the arrow as “gets”. Names make code readable. <code>gold - 3 * price</code> means something, while <code>50 - 3 * 8</code> doesn't.",
        fix: "left <- 50 - 3 * 8", keyVar: "left",
      },
      {
        id: 3, short: "III · Vectors", title: "Chapter III · A Row of Runes", stat: "wrangling",
        story: [
          "In the yard stands a straw training dummy. You strike it five times. Runes glow on its chest: <em>4, 7, 2, 9, 5</em>. That's the strength of each strike.",
          "<em>“Five numbers, one name,”</em> says Thessaly. <em>“We call that a vector. Most of your data will look like this.”</em>",
        ],
        task: "The strikes are stored in <code>hits</code>. Store their average in <code>avg_hit</code> and their count in <code>n_hits</code>.",
        starter: "# c() combines values into one vector\nhits <- c(4, 7, 2, 9, 5)\nhits\n\navg_hit <- ____(hits)\nn_hits <- ____(hits)\n\navg_hit\nn_hits",
        hint: "Look in the spellbook under <b>Basics</b> and <b>Summaries &amp; groups</b>. One function finds the centre. Another counts elements.",
        lesson: "<b>Lesson:</b> A vector holds many values under one name. Functions like <code>mean()</code>, <code>sum()</code>, <code>max()</code> and <code>length()</code> work on the whole vector at once.",
        fix: "hits <- c(4, 7, 2, 9, 5); avg_hit <- mean(hits); n_hits <- length(hits)", keyVar: "n_hits",
      },
      {
        id: 4, short: "IV · Tables", title: "Chapter IV · The Apprentice Roster", stat: "sight",
        story: [
          "Thessaly unrolls a long scroll. <em>“The roster of this year's apprentices. Names, houses, ages, exam scores.”</em>",
          "<em>“Many vectors side by side make a table. In R it's a data frame. Every column is a vector.”</em> The roster is loaded as <code>roster</code>.",
        ],
        task: "Look at the roster. Take out the <code>score</code> column, and store the highest score in <code>top_score</code>.",
        starter: "head(roster)\nnrow(roster)\n\n# The $ sign opens one column of a data frame\nscores <- roster$____\ntop_score <- ____(scores)\ntop_score",
        hint: "Column names are on top of the <code>head()</code> output. For the highest value, check <b>Summaries &amp; groups</b>.",
        lesson: "<b>Lesson:</b> A data frame is a table. Rows are observations and columns are variables. <code>df$col</code> pulls out one column as a vector, so everything you learned about vectors still works.",
        fix: "top_score <- max(roster$score)", keyVar: "top_score",
      },
      {
        id: 5, short: "V · The Scroll", title: "Chapter V · The Broken Scroll", stat: "wisdom",
        enemy: { name: "Scroll Gremlin", hp: 3, note: "Has hidden 3 mistakes in the scroll.", art: "gremlin" },
        story: [
          "Your final test. A Scroll Gremlin has scribbled over Thessaly's potion recipe. The spell no longer works.",
          "<em>“Red text is not your enemy,”</em> she says. <em>“It tells you where it hurts. Cast the scroll, read the error, fix one thing, and cast again.”</em>",
        ],
        task: "Cast the broken scroll as it is. Read each error. Fix the three mistakes until <code>total</code> and <code>average</code> are computed.",
        starter: "# The gremlin broke this scroll in 3 places\npotion <- c(3, 8, 5\ntotal <- sum(Potion)\naverage <- mean(potion\n\ntotal\naverage",
        hint: "Every opening bracket <code>(</code> needs a closing one <code>)</code>. And R cares about capital letters: <code>potion</code> and <code>Potion</code> are different names.",
        lesson: "<b>Lesson:</b> Errors are normal. The usual culprits are missing brackets, missing quotes, missing commas and wrong capital letters. Fix one thing at a time and run again. You are ready for Millbrook.",
      },
    ],
    epilogue: () => `
      <p>The Gremlin squeaks and vanishes in a puff of ink. Thessaly rolls up the scroll and smiles.</p>
      <p><em>“You can ask R questions, name things, work with vectors and tables, and read your own mistakes. That's all you need to begin.”</em></p>
      <p><em>“Down the road lies Millbrook. Their harvest is failing, and they need someone who can read a ledger. Go.”</em></p>`,
    summary: "You learned to run R code, store values, use vectors and data frames, and fix errors.",
  },
  {
    id: "s1", npc: "maren", num: 1, title: "The Blighted Harvest", place: "Millbrook", topic: "Exploring data · missing values · groups · correlation",
    chapters: [
      {
        id: 1, short: "I · The Ledger", title: "Chapter I · The Elder's Ledger", stat: "wrangling",
        story: [
          "Millbrook sits at the edge of the Hollow Vale. For three summers its harvest has withered, and nobody knows why.",
          "Elder Maren slides a heavy ledger across the table. <em>“Every field, every year, since '78. Rain, soil, yield. The answer is in there, if anyone can read it.”</em>",
          "The ledger is already loaded as <code>df</code>. Before you hunt for answers, you need to know what you hold.",
        ],
        task: "Look at the first rows of the ledger. Then store the number of entries in <code>n_records</code>.",
        starter: "# Peek at the ledger\nhead(df)\n\n# How many entries does it hold?\nn_records <- ____\nn_records",
        hint: "The spell <code>nrow(df)</code> counts the rows of a data frame.",
        lesson: "<b>Lesson:</b> Always look at your data before analysing it. <code>head()</code> shows the columns and a few rows. <code>nrow()</code> tells you how much you have.",
        fix: "n_records <- nrow(df)", keyVar: "n_records",
      },
      {
        id: 2, short: "II · The Goblin", title: "Chapter II · The Missing Value Goblin", stat: "wrangling",
        enemy: { name: "Missing Value Goblin", hp: 6, note: "Has eaten 6 rainfall entries.", art: "goblin" },
        story: [
          "As you turn the pages, something skitters across the ledger. A <em>Missing Value Goblin</em>. It has chewed holes in the rainfall column.",
          "You could tear out the damaged pages. But the goblin wants exactly that. Every page you destroy is evidence lost.",
          "Instead, patch the holes. The median is a safe guess. Unlike the mean, a few extreme years can't drag it around.",
        ],
        task: "Count the gaps. Then make <code>clean</code>, a copy of <code>df</code> where missing <code>rainfall_mm</code> values are filled with the median rainfall.",
        starter: "# Where did the goblin bite?\ncolSums(is.na(df))\n\n# median() refuses to work with gaps unless you tell it to skip them\nmedian_rain <- median(df$rainfall_mm, na.rm = ____)\n\nclean <- df\nclean$rainfall_mm[is.na(clean$rainfall_mm)] <- ____\n\ncolSums(is.na(clean))",
        hint: "Set <code>na.rm = TRUE</code>. Then put <code>median_rain</code> into the gaps.",
        lesson: "<b>Lesson:</b> Dropping rows with <code>na.omit()</code> throws away information. Imputing with the median keeps every record and is robust to outliers. It is a choice, though. Always note it in your report.",
        fix: "clean <- df; clean$rainfall_mm[is.na(clean$rainfall_mm)] <- median(df$rainfall_mm, na.rm = TRUE)", keyVar: "clean",
      },
      {
        id: 3, short: "III · The Fields", title: "Chapter III · Which Field Suffers Most?", stat: "sight",
        story: [
          "The ledger is whole again. Maren leans in. <em>“Eight fields feed this village. Are they all dying, or only some?”</em>",
          "A single number for the whole village would hide the answer. You need the average harvest for <em>each</em> field. Time for the Grouping spell.",
        ],
        task: "Compute the average <code>yield_bushels</code> per <code>field</code> using <code>clean</code>. Store the name of the weakest field in <code>worst_field</code>.",
        starter: "avg <- tapply(clean$yield_bushels, clean$____, mean)\nsort(avg)\n\nworst_field <- names(____(avg))\nworst_field",
        hint: "Group by <code>clean$field</code>. The position of the smallest value comes from <code>which.min()</code>.",
        lesson: "<b>Lesson:</b> <code>tapply</code> splits data into groups, applies a summary such as the mean, and combines the results. Comparing groups is often the fastest way to find where a problem lives.",
        fix: "worst_field <- names(which.min(tapply(clean$yield_bushels, clean$field, mean)))", keyVar: "worst_field",
      },
      {
        id: 4, short: "IV · The Oracle", title: "Chapter IV · The Oracle's Riddle", stat: "modeling",
        predict: {
          q: "Before you consult the Oracle, make your guess. Which factor moves most closely with the harvest?",
          options: [{ v: "rainfall_mm", label: "rainfall_mm" }, { v: "soil_ph", label: "soil_ph" }, { v: "mill_distance_km", label: "mill_distance_km" }],
          answer: "mill_distance_km",
        },
        story: [
          "At the crossroads stands the Oracle, a stone that speaks only in numbers between −1 and 1.",
          "<em>“Ask me how two things move together,”</em> it hums, <em>“and I shall answer. But I will not tell you why.”</em>",
        ],
        task: "Keep the numeric columns of <code>clean</code>. Compute their correlations, and store the <code>yield_bushels</code> column in <code>corrs</code>.",
        starter: "nums <- clean[sapply(clean, is.numeric)]\ntable <- cor(nums)\n\ncorrs <- table[, \"____\"]\nround(corrs, 2)",
        hint: "Pick the column <code>\"yield_bushels\"</code> from the correlation matrix.",
        lesson: "<b>Lesson:</b> Correlation measures how two variables move together in a straight line. Close to 1 or −1 is strong. Close to 0 is weak. Guessing first and checking second makes the result stick.",
        fix: "corrs <- cor(clean[sapply(clean, is.numeric)])[, \"yield_bushels\"]", keyVar: "corrs",
      },
      {
        id: 5, short: "V · The Mill", title: "Chapter V · The Shadow over the Old Mill", stat: "wisdom",
        enemy: { name: "The Rotwarden of the Old Mill", hp: 10, note: "Hides behind weak correlations.", art: "ward" },
        story: [
          "The Oracle's numbers swirl in the air. One stands out. Upstream, the Old Mill groans back to life at night, though no miller has worked there in years.",
          "Something there is feeding on the Vale. To banish it, you must name what it hides behind.",
        ],
        task: "Remove <code>yield_bushels</code> and <code>year</code> from <code>corrs</code>. Find the column with the strongest correlation, positive or negative. Store its name in <code>culprit</code>.",
        starter: "links <- corrs[!names(corrs) %in% c(\"yield_bushels\", \"year\")]\nround(links, 2)\n\nculprit <- names(which.max(____(links)))\nculprit",
        hint: "Strength ignores the sign. Use <code>abs()</code> inside <code>which.max()</code>.",
        lesson: "<b>Lesson:</b> The Oracle warned you. Correlation is not causation. The mill is a strong suspect, but a real analyst would now test it. That is your next quest on the map.",
      },
    ],
    epilogue: (S, P) => `
      <p>You name the culprit aloud: <code>mill_distance_km</code>. The Rotwarden shrieks and flees upstream. The Old Mill falls silent, for now.</p>
      <p>The pattern was in the ledger all along. The closer a field lies to the mill, the worse its harvest. Rainfall and soil barely mattered.</p>
      <p>At the Oracle, you guessed <code>${esc(P.guesses?.[4] || "nothing")}</code>. ${P.guesses?.[4] === "mill_distance_km" ? "You saw it before the numbers did. Well read." : "The data surprised you. That surprise is exactly why analysts check their hunches."}</p>
      <p><em>“Good session,”</em> says the DM, gathering the dice. <em>“But the Oracle only showed you a link. Next time, you go to the mill and prove it.”</em></p>`,
    summary: "You learned to inspect a dataset, impute missing values, compare groups and read correlations.",
  },
  {
    id: "s2", npc: "seer", num: 2, title: "Trial at the Old Mill", place: "The Old Mill", topic: "Charts · before/after · experiments · t-test",
    chapters: [
      {
        id: 1, short: "I · The Seer", title: "Chapter I · The Seer's Eye", stat: "sight", graphics: true,
        predict: {
          q: "Before you draw, picture it. Each dot is one field in one year. How will yield change as you move away from the mill?",
          options: [{ v: "rising", label: "It rises" }, { v: "flat", label: "No pattern" }, { v: "falling", label: "It falls" }],
          answer: "rising",
        },
        story: [
          "You follow the river upstream to the Old Mill. Its wheel turns slowly, though no water should move it. A blind Seer sits on the steps.",
          "<em>“The Oracle gave you numbers,”</em> she says. <em>“Numbers hide things. Draw the ledger, and let your eyes judge.”</em>",
          "Elder Maren has sent an older ledger too, going back to 1972. It is loaded as <code>ledger</code>.",
        ],
        task: "Draw a scatterplot with <code>mill_distance_km</code> on the x-axis and <code>yield_bushels</code> on the y-axis.",
        starter: "head(ledger)\n\nplot(ledger$____, ledger$yield_bushels,\n     pch = 19, col = \"darkred\",\n     xlab = \"Distance from the mill (km)\", ylab = \"Yield (bushels)\",\n     main = \"The Seer's vision\")",
        hint: "Put <code>mill_distance_km</code> in the blank. The x variable comes first in <code>plot()</code>.",
        lesson: "<b>Lesson:</b> Always plot your data. A correlation is one number. A scatterplot shows the whole shape, including groups and outliers that one number hides.",
      },
      {
        id: 2, short: "II · The Archive", title: "Chapter II · Before the Mill Woke", stat: "wrangling",
        story: [
          "Look at the vision again. Near the mill there are two clouds of dots. Some near fields did badly. Others did just fine.",
          "<em>“The mill was silent until 1978,”</em> the Seer whispers. <em>“Tag each entry. Was it before or after? Near or far?”</em>",
        ],
        task: "Add a column <code>period</code>: \"before\" for years before 1978, \"after\" otherwise. Add a column <code>zone</code>: \"near\" for fields under 2 km from the mill, \"far\" otherwise.",
        starter: "ledger$period <- ifelse(ledger$year < ____, \"before\", \"after\")\nledger$zone <- ifelse(ledger$mill_distance_km < 2, \"____\", \"far\")\n\ntable(ledger$zone, ledger$period)",
        hint: "The mill woke in <code>1978</code>. Fields under 2 km are <code>\"near\"</code>.",
        lesson: "<b>Lesson:</b> <code>ifelse()</code> turns a condition into categories. Creating the right groups is often the most important step of an analysis.",
        fix: "ledger$period <- ifelse(ledger$year < 1978, \"before\", \"after\"); ledger$zone <- ifelse(ledger$mill_distance_km < 2, \"near\", \"far\")", keyVar: "ledger",
      },
      {
        id: 3, short: "III · Then & Now", title: "Chapter III · Then and Now", stat: "sight", graphics: true,
        story: [
          "If the mill is to blame, near fields should drop after 1978. Far fields should barely change. Bad weather would hit both.",
          "This trick has a name among analysts: <em>difference-in-differences</em>. Compare how each group changed, then compare the changes.",
        ],
        task: "Draw a boxplot of <code>yield_bushels</code> by <code>zone</code> and <code>period</code>. Then store the average yield for each zone and period in <code>means</code>.",
        starter: "boxplot(yield_bushels ~ period + zone, data = ledger,\n        col = c(\"#d9a441\", \"#8a2a1e\"),\n        main = \"Harvests then and now\")\n\nmeans <- tapply(ledger$yield_bushels,\n                list(ledger$zone, ledger$____), mean)\nround(means, 1)",
        hint: "The second group is <code>ledger$period</code>.",
        lesson: "<b>Lesson:</b> Difference-in-differences compares changes, not levels. Far fields act as a control group. They show what would have happened to near fields without the mill.",
        fix: "means <- tapply(ledger$yield_bushels, list(ledger$zone, ledger$period), mean)", keyVar: "means",
      },
      {
        id: 4, short: "IV · The Trial", npc: "maren", title: "Chapter IV · The Elder's Trial", stat: "modeling", graphics: true,
        predict: {
          q: "Maren ran a trial. On 12 random plots near the mill, she dug a ditch so the stream bypasses the mill. 12 other plots stayed as they were. What happened?",
          options: [{ v: "more", label: "Diverted plots grew more" }, { v: "same", label: "About the same" }, { v: "less", label: "Diverted plots grew less" }],
          answer: "more",
        },
        story: [
          "Old records can always be argued with. Maybe the near fields just got tired. So the Elder did something bolder.",
          "<em>“I flipped a coin for each plot,”</em> she says. <em>“Heads, the water skips the mill. Tails, it doesn't.”</em> Her results are in <code>trial</code>.",
        ],
        task: "Compare the two groups with a boxplot. Then run a t-test of <code>yield_bushels</code> by <code>group</code> and store its p-value in <code>p_value</code>.",
        starter: "boxplot(yield_bushels ~ group, data = trial,\n        col = c(\"#8a2a1e\", \"#d9a441\"), main = \"The Elder's trial\")\n\nresult <- t.test(yield_bushels ~ ____, data = trial)\nresult\n\np_value <- result$____\np_value",
        hint: "Test by <code>group</code>. The p-value lives in <code>result$p.value</code>.",
        lesson: "<b>Lesson:</b> Random assignment is the analyst's strongest spell. The coin decided who got the ditch, so the groups differ only by chance and by the treatment. A small p-value means luck is a poor explanation.",
        fix: "p_value <- t.test(yield_bushels ~ group, data = trial)$p.value", keyVar: "p_value",
      },
      {
        id: 5, short: "V · The Verdict", title: "Chapter V · The Rotwarden's Last Lie", stat: "wisdom",
        enemy: { name: "The Rotwarden, cornered", hp: 12, note: "Claims it was all luck.", art: "ward" },
        story: [
          "The mill wheel stops. The Rotwarden steps out of the shadows. <em>“Coincidence,”</em> it hisses. <em>“Lucky coins. Lucky plots. You prove nothing.”</em>",
          "Answer it with two numbers. How big is the effect? And is luck believable?",
        ],
        task: "Store the mean yield of diverted plots minus the mean of control plots in <code>effect</code>. Then set <code>verdict</code> to \"mill\" if <code>p_value</code> is below 0.05, or \"luck\" otherwise.",
        starter: "effect <- mean(trial$yield_bushels[trial$group == \"diverted\"]) -\n          mean(trial$yield_bushels[trial$group == \"____\"])\nround(effect, 1)\n\nverdict <- if (p_value < ____) \"mill\" else \"luck\"\nverdict",
        hint: "The other group is <code>\"control\"</code>. The usual threshold is <code>0.05</code>.",
        lesson: "<b>Lesson:</b> Report the effect size and the p-value together. The p-value says whether luck is believable. The effect says whether the difference matters. Here both point to the mill.",
      },
    ],
    epilogue: (S, P) => `
      <p>You speak the verdict: <code>mill</code>. The Rotwarden has no answer left. It dissolves into the millrace, and the wheel stops for good.</p>
      <p>Look at what you built. The scatterplot raised a question. Before-and-after comparisons narrowed it down. The random trial settled it. Correlation pointed. The experiment proved.</p>
      <p>At the trial, you guessed <code>${esc(P.guesses?.[4] || "nothing")}</code>. ${P.guesses?.[4] === "more" ? "Your instinct matched the evidence." : "The evidence went another way. Good analysts let it."}</p>
      <p><em>“That's the Vale saved,”</em> the DM says. <em>“But a ship just docked at Merchant's Port. Its customers keep vanishing…”</em></p>`,
    summary: "You learned to plot data, build groups, compare before and after, and test an experiment with a t-test.",
  },
  {
    id: "s3", npc: "ilsa", num: 3, title: "The Vanishing Customers", place: "Merchant's Port", topic: "Churn · logistic regression · odds ratios · targeting",
    chapters: [
      {
        id: 1, short: "I · The Coin", title: "Chapter I · The Master of Coin", stat: "wrangling",
        story: [
          "The Vale is safe, so you take the road south to Merchant's Port. Gulls, tar and shouting. In the Guild Hall, Master of Coin Ilsa Vane is not shouting. She is worried.",
          "<em>“Our regulars are vanishing,”</em> she says. <em>“Last season we lost a lot of them. I want to know who leaves, and why, before more go.”</em>",
          "Her customer ledger is loaded as <code>guild</code>. The column <code>left</code> is 1 if a customer left last season and 0 if they stayed.",
        ],
        task: "Store the share of customers who left in <code>churn_rate</code>. Then store the churn rate for each <code>loyalty</code> group in <code>rate_by_seal</code>.",
        starter: "head(guild)\n\n# The mean of a 0/1 column is the share of 1s\nchurn_rate <- ____(guild$left)\nchurn_rate\n\nrate_by_seal <- tapply(guild$left, guild$____, mean)\nround(rate_by_seal, 2)",
        lesson: "<b>Lesson:</b> Churn is the share of customers who leave in a period. When an outcome is coded 0 and 1, its mean is a proportion. Comparing that proportion across groups is the first step of any churn analysis.",
        fix: "churn_rate <- mean(guild$left); rate_by_seal <- tapply(guild$left, guild$loyalty, mean)", keyVar: "rate_by_seal",
      },
      {
        id: 2, short: "II · The Departed", title: "Chapter II · Faces of the Departed", stat: "sight", graphics: true,
        predict: {
          q: "Think about the customers who left. Compared to those who stayed, how often did they visit the Guild last season?",
          options: [{ v: "less", label: "Less often" }, { v: "same", label: "About the same" }, { v: "more", label: "More often" }],
          answer: "less",
        },
        story: [
          "Ilsa opens a drawer of old receipts. <em>“Some faces I haven't seen in months. Others came every week until the day they stopped.”</em>",
          "A chart will tell you more than her memory. Compare the visits of those who stayed with those who left.",
        ],
        task: "Draw a boxplot of <code>visits</code> by <code>left</code>. Then store the average visits of stayers and leavers in <code>mean_visits</code>.",
        starter: "boxplot(visits ~ ____, data = guild,\n        names = c(\"stayed\", \"left\"),\n        col = c(\"#d9a441\", \"#8a2a1e\"),\n        main = \"Visits last season\")\n\nmean_visits <- tapply(guild$visits, guild$left, ____)\nround(mean_visits, 1)",
        lesson: "<b>Lesson:</b> Customers often disengage before they churn. Falling visits are an early warning. In marketing this is a classic leading indicator, and it is what churn models learn to spot.",
        fix: "mean_visits <- tapply(guild$visits, guild$left, mean)", keyVar: "mean_visits",
      },
      {
        id: 3, short: "III · The Augur", title: "Chapter III · The Augur's Model", stat: "modeling",
        story: [
          "Visits matter. But so might complaints, loyalty seals and how long someone has been a member. Looking at one trait at a time won't untangle them.",
          "In a tower above the harbour lives the Augur. <em>“Give me many traits at once,”</em> she says, <em>“and I will weigh them together. But your outcome is yes or no, so a straight line won't do. You need the logistic spell.”</em>",
        ],
        task: "Fit a logistic regression of <code>left</code> on <code>visits</code>, <code>complaints</code>, <code>loyalty</code> and <code>tenure_months</code>. Store it in <code>model</code>.",
        starter: "model <- glm(left ~ visits + complaints + loyalty + tenure_months,\n             family = ____, data = ____)\n\nsummary(model)",
        lesson: "<b>Lesson:</b> Logistic regression models the probability of a yes/no outcome. Each coefficient is the change in the log-odds for one unit more of that trait, holding the others fixed. A negative sign lowers the risk. A positive sign raises it.",
        fix: "model <- glm(left ~ visits + complaints + loyalty + tenure_months, family = binomial, data = guild)", keyVar: "model",
      },
      {
        id: 4, short: "IV · The Runes", title: "Chapter IV · Reading the Augur's Runes", stat: "wisdom",
        predict: {
          q: "Before you translate the runes, guess. Which trait raises the risk of leaving the most?",
          options: [{ v: "complaints", label: "Each complaint" }, { v: "visits", label: "Each visit" }, { v: "loyaltyyes", label: "Having a loyalty seal" }],
          answer: "complaints",
        },
        story: [
          "Ilsa squints at the summary. <em>“Log-odds? I sell silk, not riddles. Tell me in plain words.”</em>",
          "Raise e to the power of each coefficient and you get odds ratios. Above 1 means more likely to leave. Below 1 means less likely.",
        ],
        task: "Store the odds ratios of <code>model</code> in <code>odds</code>. Leave out the intercept, and store the name of the trait with the largest odds ratio in <code>worst</code>.",
        starter: "odds <- ____(coef(model))\nround(odds, 2)\n\n# odds[-1] drops the first entry, the intercept\nworst <- names(____(odds[-1]))\nworst",
        lesson: "<b>Lesson:</b> An odds ratio of 2 means the odds double for each extra unit. An odds ratio of 0.4 means they shrink by 60%. Odds ratios are how you explain a logistic model to a manager.",
        fix: "odds <- exp(coef(model)); worst <- names(which.max(odds[-1]))", keyVar: "worst",
      },
      {
        id: 5, short: "V · The Siren", title: "Chapter V · The Silver Siren", stat: "wisdom",
        enemy: { name: "The Silver Siren", hp: 20, note: "Sings customers away to a rival port.", art: "siren" },
        story: [
          "At dusk you hear it. A song from the water, sweet and silver. The Siren of the rival port is calling more customers away tonight.",
          "<em>“I have riders for twenty visits, no more,”</em> Ilsa says. <em>“Tell me who to visit first.”</em> Use the Augur's model to score every customer.",
        ],
        task: "Add a column <code>risk</code> to <code>guild</code> with each customer's predicted probability of leaving. Then store the <code>customer_id</code> of the 20 riskiest customers in <code>save_list</code>.",
        starter: "guild$risk <- predict(model, type = \"____\")\nsummary(guild$risk)\nhist(guild$risk, main = \"Risk of leaving\", col = \"#8a2a1e\")\n\nranked <- guild[order(guild$risk, decreasing = ____), ]\nsave_list <- ranked$customer_id[1:20]\nsave_list",
        graphics: true,
        lesson: "<b>Lesson:</b> Scoring customers by predicted risk lets you spend a small budget where it matters most. One warning from the field: high risk is not the same as persuadable. Some of these customers would leave whatever you do. Testing that is a story for another day.",
      },
    ],
    epilogue: (S, P) => `
      <p>Twenty riders gallop out at dawn with gifts and apologies. By evening, most of the twenty have renewed their seals. The Siren's song fades into the fog.</p>
      <p>You counted the leavers, saw them drift before they left, weighed every trait at once, and turned the Augur's runes into plain odds. Then you used the model to decide who to save.</p>
      <p>At the Augur, you guessed <code>${esc(P.guesses?.[4] || "nothing")}</code>. ${P.guesses?.[4] === "complaints" ? "You read people well. Complaints were the loudest warning." : "The runes disagreed. Complaints were the loudest warning."}</p>
      <p><em>“Not bad for a basement full of dice,”</em> says the DM. <em>“But Ilsa isn't finished with you. Something about letters nobody reads…”</em></p>`,
    summary: "You learned to measure churn, compare groups, fit a logistic regression, read odds ratios and target customers by predicted risk.",
  },
  {
    id: "s6", npc: "ilsa", num: 4, title: "The Guild Census", place: "Guildhall", topic: "Segmentation · scaling · hierarchical clustering · dendrograms",
    chapters: [
      {
        id: 1, short: "I · The Census", title: "Chapter I · The Census Ledger", stat: "sight", graphics: true,
        predict: {
          q: "Before you draw, guess. If you plot each member's visits against their basket size, how many natural groups will you see?",
          options: [{ v: "1", label: "One big cloud" }, { v: "3", label: "About three groups" }, { v: "many", label: "Many tiny groups" }],
          answer: "3",
        },
        story: [
          "Ilsa calls you back to the port. The Siren is gone, but a new worry has arrived. <em>“I send every member the same letter. Half of them throw it away.”</em>",
          "<em>“Some come every week for bread. Others come twice a year for silk. Surely they want different things.”</em> Her census of 60 members is loaded as <code>members</code>.",
        ],
        task: "Look at the census. Then plot <code>basket_gold</code> against <code>visits_per_month</code>.",
        starter: "head(members)\nsummary(members)\n\nplot(members$visits_per_month, members$____,\n     pch = 19, col = 1,\n     xlab = \"Visits per month\", ylab = \"Gold per basket\",\n     main = \"The guild's members\")",
        lesson: "<b>Lesson:</b> Segmentation means splitting customers into groups that behave alike. Always look first. A plot of two key variables often shows whether groups exist at all.",
      },
      {
        id: 2, short: "II · Footing", title: "Chapter II · Equal Footing", stat: "wrangling",
        story: [
          "To group members, you must measure how different two members are. But the columns speak in different units: visits, gold, shares, months.",
          "<em>“A member who spends 100 gold more and one who visits 5 times more,”</em> Ilsa muses, <em>“which is the bigger difference?”</em> Put every column on the same scale first.",
        ],
        task: "Store the four numeric columns, standardised with <code>scale()</code>, in <code>X</code>.",
        starter: "vars <- c(\"visits_per_month\", \"basket_gold\", \"luxury_share\", \"months_member\")\n\nX <- ____(members[, vars])\nround(head(X), 2)\nround(apply(X, 2, sd), 2)",
        lesson: "<b>Lesson:</b> Distance-based methods are sensitive to units. Without scaling, the column with the biggest numbers, here gold, decides almost everything. <code>scale()</code> gives each column mean 0 and standard deviation 1.",
        fix: "X <- scale(members[, c(\"visits_per_month\", \"basket_gold\", \"luxury_share\", \"months_member\")])", keyVar: "X",
      },
      {
        id: 3, short: "III · The Tree", title: "Chapter III · The Family Tree", stat: "modeling", graphics: true,
        story: [
          "Now measure the distance between every pair of members. Then join the two closest, then the next closest, again and again, until everyone sits in one family.",
          "The record of those joins is a tree, a <em>dendrogram</em>. Ward's method joins the groups that keep each group as tight as possible.",
        ],
        task: "Compute the distances of <code>X</code> with <code>dist()</code>. Build the tree with <code>hclust()</code> and Ward's method. Store it in <code>tree</code> and plot it.",
        starter: "d <- ____(X)\ntree <- hclust(d, method = \"ward.D2\")\n\nplot(____, labels = FALSE, hang = -1,\n     main = \"The guild's family tree\", xlab = \"\", sub = \"\")",
        lesson: "<b>Lesson:</b> Hierarchical clustering doesn't need the number of groups up front. It builds the whole tree, from single members up to one group. The height of each join shows how different the two groups were.",
        fix: "tree <- hclust(dist(X), method = \"ward.D2\")", keyVar: "tree",
      },
      {
        id: 4, short: "IV · The Cut", title: "Chapter IV · Cutting the Tree", stat: "wisdom", graphics: true,
        story: [
          "A tree is not yet a set of segments. You have to decide where to cut it.",
          "Look for the longest branches, where a big jump in height means you'd be merging very different groups. Cut just below that jump.",
        ],
        task: "Cut the tree into 3 groups with <code>cutree()</code> and store them in a new column <code>segment</code>. Then draw the tree again with boxes around the groups.",
        starter: "members$segment <- cutree(tree, k = ____)\ntable(members$segment)\n\nplot(tree, labels = FALSE, hang = -1, main = \"Three segments\", xlab = \"\", sub = \"\")\nrect.hclust(tree, k = 3, border = c(1, 2, 3))",
        lesson: "<b>Lesson:</b> Choosing k is a judgement call. The dendrogram helps: cut where the vertical gaps are largest. It should also make business sense. Three segments Ilsa can act on beat ten she can't.",
        fix: "members$segment <- cutree(tree, k = 3)", keyVar: "members",
      },
      {
        id: 5, short: "V · The Crowd", title: "Chapter V · The Faceless Crowd", stat: "wisdom",
        enemy: { name: "The Faceless Crowd", hp: 16, note: "Insists every customer is the same.", art: "crowd" },
        story: [
          "A grey mass shuffles into the Guildhall. <em>“We are all the same,”</em> it murmurs with sixty mouths. <em>“Send us all the same letter.”</em>",
          "Give each segment a face. Average every trait per segment, and find the members who love luxury most.",
        ],
        task: "Store the mean of the four traits per <code>segment</code> in <code>profile</code>. Then store the number of the segment with the highest <code>luxury_share</code> in <code>nobles</code>.",
        starter: "profile <- aggregate(cbind(visits_per_month, basket_gold, luxury_share, months_member) ~ segment,\n                     data = members, FUN = ____)\nprofile\n\nnobles <- profile$segment[____(profile$luxury_share)]\nnobles",
        lesson: "<b>Lesson:</b> A segment is only useful once you can describe it. Profiling the averages turns numbers into personas, such as “Regulars”, “Nobles” and “Newcomers”. Each one can get its own offer.",
      },
    ],
    epilogue: (S, P) => `
      <p>The Faceless Crowd splits into three, and each part takes on a face. The Regulars want bread on Tuesdays. The Nobles want first pick of the silk. The Newcomers want a reason to come back.</p>
      <p>Ilsa writes three letters instead of one. Within a season, fewer letters end up in the fire.</p>
      <p>You guessed <code>${esc(P.guesses?.[1] === "3" ? "about three groups" : P.guesses?.[1] || "nothing")}</code>. ${P.guesses?.[1] === "3" ? "Your eye found the segments before the algorithm did." : "The plot showed three clouds. Looking first is half of segmentation."}</p>
      <p><em>“Nice work,”</em> says the DM. <em>“You scaled, measured, grew a tree, cut it and gave every branch a name. That's hierarchical clustering, start to finish. Now look north. The Tower of Seasons has been sending strange signals…”</em></p>`,
    summary: "You learned to explore segments, scale variables, build a dendrogram with Ward's method, cut it into groups and profile each segment.",
  },
  {
    id: "s4", npc: "odo", num: 5, title: "The Tower of Seasons", place: "Tower of Seasons", topic: "Time series · seasonality · moving averages · forecasting",
    chapters: [
      {
        id: 1, short: "I · The Almanac", title: "Chapter I · The Keeper's Almanac", stat: "sight", graphics: true,
        predict: {
          q: "The Tower's lamp burns oil every night. Picture six years of monthly oil use. What shape will the line have?",
          options: [{ v: "flat", label: "Flat, with random bumps" }, { v: "rise", label: "A steady rise" }, { v: "wave", label: "A rise with a yearly wave" }],
          answer: "wave",
        },
        story: [
          "High in the mountains stands the Tower of Seasons. Its great lamp guides every ship to Merchant's Port. Keeper Odo meets you at the door, out of breath.",
          "<em>“Winter is coming and I must order oil for next year. Too little, and the lamp goes dark. Too much, and the guild ruins me.”</em> His records are loaded as <code>almanac</code>.",
        ],
        task: "Plot <code>oil_barrels</code> against <code>t</code>, the month number, as a line.",
        starter: "head(almanac)\n\nplot(almanac$t, almanac$____, type = \"____\",\n     col = \"darkred\", lwd = 2,\n     xlab = \"Month (1 = Jan 1977)\", ylab = \"Barrels\",\n     main = \"Six years of lamp oil\")",
        lesson: "<b>Lesson:</b> Always plot a time series first. Most of them mix a trend, which moves the level over years, and a season, which repeats each year. Seeing both tells you what your model must capture.",
      },
      {
        id: 2, short: "II · The Year", title: "Chapter II · The Turning of the Year", stat: "wrangling",
        story: [
          "Odo taps the wall calendar. <em>“Long nights, more oil. That much I know. But how much more?”</em>",
          "Average each calendar month across all six years. The wave will show itself.",
        ],
        task: "Store the average <code>oil_barrels</code> per <code>month</code> in <code>by_month</code>. Then store the name of the busiest month in <code>peak_month</code>.",
        starter: "by_month <- tapply(almanac$oil_barrels, almanac$____, mean)\nround(by_month)\nbarplot(by_month, col = \"#d9a441\", main = \"Average oil per month\")\n\npeak_month <- names(____(by_month))\npeak_month",
        graphics: true,
        lesson: "<b>Lesson:</b> Averaging by calendar month gives the seasonal profile. Retailers use the same idea to plan stock for Christmas or summer.",
        fix: "by_month <- tapply(almanac$oil_barrels, almanac$month, mean); peak_month <- names(which.max(by_month))", keyVar: "peak_month",
      },
      {
        id: 3, short: "III · The Smoothing", title: "Chapter III · Smoothing the Signal", stat: "modeling", graphics: true,
        story: [
          "The wave hides the trend. Is the Tower really burning more oil each year, or does it only feel that way in winter?",
          "Odo pulls a dusty lens from a drawer. <em>“My grandmother called it the Twelve-Moon Glass. Look through it and the seasons vanish.”</em>",
        ],
        task: "Add a column <code>ma12</code> with the 12-month moving average of <code>oil_barrels</code>. Then plot the oil and add the average as a second line.",
        starter: "# Each point becomes the average of the 12 months around it\nalmanac$ma12 <- as.numeric(stats::filter(almanac$oil_barrels,\n                                         rep(1/____, 12), sides = 2))\n\nplot(almanac$t, almanac$oil_barrels, type = \"l\", col = \"grey50\",\n     main = \"Through the Twelve-Moon Glass\")\n____(almanac$t, almanac$ma12, col = \"darkred\", lwd = 3)",
        lesson: "<b>Lesson:</b> A 12-month moving average contains every month exactly once, so the season cancels out and the trend remains. The first and last six months have no value, because there aren't enough neighbours.",
        fix: "almanac$ma12 <- as.numeric(stats::filter(almanac$oil_barrels, rep(1/12, 12), sides = 2))", keyVar: "almanac",
      },
      {
        id: 4, short: "IV · The Line", title: "Chapter IV · The Keeper's Equation", stat: "modeling",
        story: [
          "The glass shows a steady climb. More ships, more nights, more oil. Now you need one equation that holds both the climb and the wave.",
          "A regression can do it. Use <code>t</code> for the trend. Use <code>month</code> as a category, which gives every month its own bump.",
        ],
        task: "Fit a linear model of <code>oil_barrels</code> on <code>t</code> and <code>month</code>. Store it in <code>fit</code>, and store the coefficient of <code>t</code> in <code>growth</code>.",
        starter: "fit <- lm(oil_barrels ~ t + ____, data = almanac)\nsummary(fit)\n\ngrowth <- coef(fit)[\"____\"]\ngrowth",
        lesson: "<b>Lesson:</b> Putting month in the model as a factor creates one dummy per month, compared with January. The coefficient of t is the trend: the extra barrels per month, with the season held fixed.",
        fix: "fit <- lm(oil_barrels ~ t + month, data = almanac); growth <- coef(fit)[\"t\"]", keyVar: "growth",
      },
      {
        id: 5, short: "V · The Wraith", title: "Chapter V · The Clockwork Wraith", stat: "wisdom",
        enemy: { name: "The Clockwork Wraith", hp: 12, note: "Wants the lamp to go dark next winter.", art: "wraith" },
        story: [
          "Gears grind in the dark. The Clockwork Wraith has jammed the Tower's great clock. <em>“No one can see the future,”</em> it ticks. <em>“Order blind, and fail.”</em>",
          "But you can extend the pattern. Build the twelve months of 1983 and ask your equation what they will need.",
        ],
        task: "Make a data frame <code>future</code> for months 73 to 84. Store the predictions in <code>forecast</code> and their sum in <code>order_total</code>.",
        starter: "future <- data.frame(t = 73:____,\n                     month = factor(month.abb, levels = month.abb))\n\nforecast <- predict(fit, newdata = ____)\nround(forecast)\n\norder_total <- sum(forecast)\norder_total",
        lesson: "<b>Lesson:</b> A forecast extends the patterns the model learned. It is only as good as the assumption that the future behaves like the past. For real decisions, add <code>interval = \"prediction\"</code> to see the uncertainty too.",
      },
    ],
    epilogue: (S, P) => `
      <p>The order is sent. The Wraith's gears seize, and it crumbles into a heap of rusted springs. Somewhere below, the great clock starts ticking again.</p>
      <p>You plotted the almanac, found the season, smoothed it away to see the trend, captured both in one equation and used it to forecast a year ahead.</p>
      <p>You guessed the shape would be <code>${esc(P.guesses?.[1] || "nothing")}</code>. ${P.guesses?.[1] === "wave" ? "You saw both patterns before you drew them." : "The line had two patterns at once. That is why we always plot first."}</p>
      <p><em>“One quest left,”</em> says the DM, lowering his voice. <em>“Something has woken in Hydra Fen. Every time someone cuts off a head…”</em></p>`,
    summary: "You learned to plot a time series, find seasonality, smooth with a moving average, model trend and season together, and forecast.",
  },
  {
    id: "s5", npc: "agathe", num: 6, title: "The Overfitting Hydra", place: "Hydra Fen", topic: "Overfitting · train/test split · RMSE · model choice",
    chapters: [
      {
        id: 1, short: "I · The Brewer", title: "Chapter I · The Fen Witch's Brews", stat: "modeling",
        story: [
          "Hydra Fen is all mist and reeds. In a crooked hut lives Mother Agathe, who brews the strongest potions in the Vale. Lately they have gone wrong.",
          "<em>“I used to throw in moonleaf and nothing else,”</em> she says. <em>“Then a travelling sage told me to track every ingredient. Now I have a list of twenty-five, and I trust none of them.”</em> Her brews are in <code>brews</code>.",
        ],
        task: "Fit a model of <code>potency</code> on <code>moonleaf</code> alone. Store it in <code>m_simple</code>, and store its R² in <code>r2_simple</code>.",
        starter: "names(brews)\n\nm_simple <- lm(potency ~ ____, data = brews)\nr2_simple <- summary(m_simple)$____\nr2_simple",
        lesson: "<b>Lesson:</b> R² is the share of the variation in the outcome that the model explains. It runs from 0 to 1. It measures how well the model fits the data it was trained on, and nothing more.",
        fix: "m_simple <- lm(potency ~ moonleaf, data = brews); r2_simple <- summary(m_simple)$r.squared", keyVar: "r2_simple",
      },
      {
        id: 2, short: "II · The Heads", title: "Chapter II · Heads Grow Back", stat: "modeling",
        predict: {
          q: "Now you throw all twenty-five ingredients into the model. Most of them are probably useless. What will happen to R²?",
          options: [{ v: "up", label: "R² goes up" }, { v: "same", label: "R² stays the same" }, { v: "down", label: "R² goes down" }],
          answer: "up",
        },
        story: [
          "Out on the water, something stirs. A great Hydra rises from the fen. Each head is an ingredient, hissing <em>“Add me! Add me!”</em>",
          "Agathe sighs. <em>“The sage said: the more you include, the better your model. Let's see if he was right.”</em>",
        ],
        task: "Fit a model of <code>potency</code> on every other column. Store it in <code>m_all</code>, and store its R² in <code>r2_all</code>.",
        starter: "# The dot means: every other column in the data\nm_all <- lm(potency ~ ____, data = brews)\nr2_all <- summary(m_all)$r.squared\n\nc(simple = r2_simple, all = r2_all)",
        lesson: "<b>Lesson:</b> Adding predictors can never lower R² on the training data. Even pure noise gets used to explain random wiggles. A higher R² does not mean a better model.",
        fix: "m_all <- lm(potency ~ ., data = brews); r2_all <- summary(m_all)$r.squared", keyVar: "r2_all",
      },
      {
        id: 3, short: "III · The Split", title: "Chapter III · Split the Fen", stat: "wrangling",
        story: [
          "Agathe frowns. <em>“If every model looks good on old brews, how will I ever know which one is honest?”</em>",
          "The answer is to hide some brews from the models. Let them learn on one part, then test them on brews they have never seen.",
        ],
        task: "Use the seed and <code>sample()</code> to pick 40 row numbers into <code>idx</code>. Put those rows in <code>train</code> and the other 20 in <code>test</code>.",
        starter: "set.seed(7)\nidx <- sample(nrow(brews), ____)\n\ntrain <- brews[idx, ]\ntest  <- brews[____, ]\n\nc(train = nrow(train), test = nrow(test))",
        lesson: "<b>Lesson:</b> A train/test split mimics the future. The test set plays the role of new customers or new brews. Choosing it at random keeps it fair, and setting a seed makes the split reproducible.",
        fix: "set.seed(7); idx <- sample(nrow(brews), 40); train <- brews[idx, ]; test <- brews[-idx, ]", keyVar: "test",
      },
      {
        id: 4, short: "IV · The Test", title: "Chapter IV · The True Test", stat: "wisdom",
        predict: {
          q: "Both models learn from the 40 training brews. Then they predict the 20 hidden ones. Which will make smaller errors?",
          options: [{ v: "simple", label: "The moonleaf-only model" }, { v: "all", label: "The everything model" }, { v: "tie", label: "About the same" }],
          answer: "simple",
        },
        story: [
          "The Hydra's heads sway, confident. They have never been tested on anything they hadn't already seen.",
          "RMSE, the root mean squared error, tells you how far off a model's predictions are, in the same units as potency.",
        ],
        task: "Fit both models on <code>train</code>. Predict <code>test</code>, and store each model's test RMSE in <code>rmse_simple</code> and <code>rmse_all</code>.",
        starter: "rmse <- function(actual, predicted) sqrt(mean((actual - predicted)^2))\n\nfit_simple <- lm(potency ~ moonleaf, data = ____)\nfit_all    <- lm(potency ~ ., data = train)\n\nrmse_simple <- rmse(test$potency, predict(fit_simple, newdata = test))\nrmse_all    <- rmse(test$potency, predict(fit_all, newdata = ____))\n\nc(simple = rmse_simple, all = rmse_all)",
        lesson: "<b>Lesson:</b> The model with twenty-five ingredients memorised noise in the training brews, and that noise doesn't repeat. This is overfitting: great on old data, worse on new data.",
        fix: "rmse <- function(a, p) sqrt(mean((a - p)^2)); fit_simple <- lm(potency ~ moonleaf, data = train); fit_all <- lm(potency ~ ., data = train); rmse_simple <- rmse(test$potency, predict(fit_simple, newdata = test)); rmse_all <- rmse(test$potency, predict(fit_all, newdata = test))", keyVar: "rmse_all",
      },
      {
        id: 5, short: "V · The Hydra", title: "Chapter V · Slaying the Hydra", stat: "wisdom",
        enemy: { name: "The Overfitting Hydra", hp: 24, note: "One head for every useless ingredient.", art: "hydra" },
        story: [
          "The Hydra roars. <em>“My model scores better on every brew Agathe has ever made!”</em> And that is true, on the brews it has seen.",
          "Expose its trick. Show its error on the training brews next to its error on the hidden ones. Then crown the honest model.",
        ],
        task: "Store the training RMSE of <code>fit_all</code> in <code>train_all</code>. Then set <code>champion</code> to \"simple\" or \"all\", based on test error.",
        starter: "train_all <- rmse(train$potency, fitted(____))\n\nc(train = train_all, test = rmse_all)\n\nchampion <- if (rmse_simple < rmse_all) \"____\" else \"all\"\nchampion",
        lesson: "<b>Lesson:</b> A big gap between training and test error is the signature of overfitting. Judge models on data they have not seen. Simpler models often win, and they are easier to explain too.",
      },
    ],
    epilogue: (S, P) => `
      <p>You speak the champion's name. One by one, the Hydra's heads wither, and twenty-four useless ingredients sink into the fen. Only moonleaf remains.</p>
      <p>Mother Agathe laughs and stirs her pot. <em>“The sage was wrong. More is not better. Better is better.”</em></p>
      <p>At the true test, you guessed <code>${esc(P.guesses?.[4] || "nothing")}</code>. ${P.guesses?.[4] === "simple" ? "You trusted simplicity. So does every good analyst." : "The simple model surprised you. That surprise is the most important lesson in modelling."}</p>
      <p>The DM closes his notebook and looks around the table. <em>“That's the campaign. The Vale is saved, the port is busy, the lamp burns bright. You came in knowing statistics. You leave knowing how to use it.”</em></p>`,
    summary: "You learned to measure fit with R², see why more variables always raise it, split data into train and test, compare models by RMSE and spot overfitting.",
  },
];

const FUTURE = [];

/* ---------- State ---------- */
const KEY = "blighted-harvest-r2";
const freshProgress = () => ({ step: 1, code: {}, solved: {}, guesses: {}, fails: {}, tier: {}, revealed: {}, done: false });
const DEFAULT = { name: "", cls: "", xp: 0, level: 1, stats: { wrangling: 10, sight: 10, modeling: 10, wisdom: 10 }, rolls: [], view: "prologue", current: null, progress: {} };
let S = JSON.parse(JSON.stringify(DEFAULT));
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { S = Object.assign(JSON.parse(JSON.stringify(DEFAULT)), JSON.parse(raw)); return; }
    const old = localStorage.getItem("blighted-harvest-r1");
    if (old) {
      const o = JSON.parse(old);
      Object.assign(S, { name: o.name || "", cls: o.cls || "", xp: o.xp || 0, level: o.level || 1, stats: o.stats || S.stats, rolls: o.rolls || [] });
      if (o.step > 0) {
        S.progress.s1 = { step: Math.min(o.step, 6), code: o.code || {}, solved: o.solved || {}, guesses: o.guess ? { 4: o.guess } : {}, done: o.step >= 6 };
        S.view = "map";
      }
    }
  } catch (e) {}
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
const P = (sid) => {
  const p = (S.progress[sid] = S.progress[sid] || freshProgress());
  p.fails = p.fails || {}; p.tier = p.tier || {}; p.revealed = p.revealed || {}; p.interp = p.interp || {};
  return p;
};
const sessionOf = (sid) => SESSIONS.find((x) => x.id === sid) || (S.stories?.[sid] ? storyToSession(sid, S.stories[sid]) : null);
const helpFor = (sess, st) => HELP[sess.id]?.[st.id] || (sess.story ? storyHelp(sess.id, st.id) : null);
const interpFor = (sess, st) => INTERPRET[sess.id]?.[st.id] || (sess.story ? storyInterp(sess.id, st.id) : null);
const REQUIRES = { s2: "s1", s3: "s2", s6: "s3", s4: "s6", s5: "s4" };
function sessionState(i) {
  const sess = SESSIONS[i];
  if (S.progress[sess.id]?.done) return "done";
  const req = REQUIRES[sess.id];
  const started = (S.progress[sess.id]?.step || 1) > 1;
  if (!req || started || S.progress[req]?.done) return "open";
  return "locked";
}
const recommended = () => (S.newToR && !S.progress.s0?.done ? "s0" : SESSIONS.find((x, i) => !x.optional && sessionState(i) === "open")?.id);

let webR = null, rReady = false, preparedFor = null;
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- Sidebar ---------- */
function renderSheet() {
  const c = CLASSES.find((x) => x.id === S.cls);
  const xpInLevel = S.xp % 200;
  $("sheet").innerHTML = `
    <div class="sheethead"><canvas class="heroart" id="heroArt" width="64" height="64" aria-hidden="true"></canvas>
    <div><h3>${S.name ? esc(S.name) : "Unnamed Adventurer"}</h3>
    <div class="sub">${c ? c.name : "Choose a class"} · Level ${S.level}</div></div></div>
    <div class="stats">${Object.keys(STAT_NAMES).map((k) => `<div class="stat"><small>${STAT_NAMES[k]}</small><b>${S.stats[k]}</b></div>`).join("")}</div>
    <div class="xpbar"><div style="width:${(xpInLevel / 200) * 100}%"></div></div>
    <div class="xptext"><span>XP ${S.xp}</span><span>next level at ${S.level * 200}</span></div>`;
  if (c) drawSprite($("heroArt"), HERO_SPRITE[c.id]); else $("heroArt").style.visibility = "hidden";
}

let spellQuery = "";
function renderSpells() {
  const q = spellQuery.trim().toLowerCase();
  const match = (sp) => !q || sp.join(" ").toLowerCase().includes(q);
  let total = 0;
  const groups = SPELLBOOK.map((g) => {
    const hits = g.spells.filter(match);
    total += hits.length;
    if (!hits.length) return "";
    return `<details class="spellcat" ${q ? "open" : ""}><summary>${esc(g.cat)} <span>${hits.length}</span></summary>${hits.map(([sig, what, ex]) =>
      `<div class="spell"><div class="sig">${esc(sig)}</div><div class="what">${esc(what)}</div><div class="ex">${esc(ex)}</div></div>`).join("")}</details>`;
  }).join("");
  $("spells").innerHTML = groups || `<div class="what" style="font-size:15px;padding:8px 0">No spell matches “${esc(spellQuery)}”. Try another word, like mean, plot or test.</div>`;
}

function renderDiceLog() {
  if (!S.rolls.length) { $("diceLog").textContent = "Dice log: no rolls yet. A fair d20 averages 10.5."; return; }
  const avg = S.rolls.reduce((a, b) => a + b, 0) / S.rolls.length;
  $("diceLog").textContent = `Dice log: ${S.rolls.length} roll${S.rolls.length > 1 ? "s" : ""}, average ${avg.toFixed(1)} (a fair d20 averages 10.5).`;
}

/* ---------- Main views ---------- */
function render() {
  renderSheet(); renderSpells(); renderDiceLog();
  $("rollResult").textContent = "Roll 10 or more for the next hint. Chance: 11 in 20, or 55%.";
  renderModes();
  if (S.view === "stories") return renderStories();
  if (S.view === "editor") {
    if (!ED) { try { const d = JSON.parse(localStorage.getItem(KEY + "-draft") || "null"); if (d) { ED = d.ED; edId = d.id; } } catch (e) {} }
    if (ED) return renderEditor();
    S.view = "stories"; return renderStories();
  }
  if (S.view === "session" && sessionOf(S.current)?.story) { /* stories can be played before a hero exists */ }
  else if (S.view === "prologue" || !S.name || !S.cls) return renderPrologue();
  if (S.view === "map" || !S.current || !sessionOf(S.current)) return renderMap();
  const sess = sessionOf(S.current);
  const prog = P(sess.id);
  renderTrack(sess, prog);
  if (prog.step > sess.chapters.length) return renderEpilogue(sess, prog);
  renderChapter(sess, prog);
}

function renderTrack(sess, prog) {
  const items = sess.chapters.map((c) => `<span class="${c.id < prog.step ? "done" : c.id === prog.step ? "now" : ""}">${c.short}</span>`);
  items.push(`<span class="${prog.step > sess.chapters.length ? "now" : ""}">Epilogue</span>`);
  $("track").innerHTML = `<button class="backlink" id="toMap">${sess.story ? (prog.testFrom ? "← Back to editor" : "← Story Mode") : "← Map"}</button>` + items.join("");
  $("toMap").addEventListener("click", goMap);
}

function renderModes() {
  const nav = $("modes"); if (!nav) return;
  nav.hidden = false;
  const inStory = S.view === "stories" || S.view === "editor" || (S.view === "session" && sessionOf(S.current)?.story);
  nav.querySelectorAll("[data-mode]").forEach((b) => { const on = (b.dataset.mode === "stories") === !!inStory; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on ? "true" : "false"); });
}
function goMap() {
  const sess = sessionOf(S.current);
  if (sess && sess.story) {
    const prog = P(sess.id);
    if (prog.testFrom) { delete S.stories.st_test; delete S.progress.st_test; S.current = null; S.view = "editor"; save(); render(); return; }
    S.view = "stories"; save(); render(); window.scrollTo({ top: 0, behavior: "smooth" }); return;
  } S.view = "map"; save(); render(); window.scrollTo({ top: 0, behavior: "smooth" }); }

function mapSVG() {
  // Positions of quest sites on the 1000 x 640 parchment.
  const pos = [[95, 470], [250, 455], [440, 275], [690, 470], [895, 390], [800, 200], [170, 190]];
  const sites = [...SESSIONS.map((s, i) => ({ num: s.num, place: s.place, title: s.title, state: sessionState(i), id: s.id })),
    ...FUTURE.map((f) => ({ num: f.num, place: f.place, title: "Coming soon", state: "locked" }))];
  const route = pos.slice(1).map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
  const sideRoute = `M${pos[0][0]} ${pos[0][1]} L${pos[1][0]} ${pos[1][1]}`;
  const rec = recommended();
  const mountains = [[640, 90], [700, 70], [880, 80], [930, 120], [720, 130], [590, 60]].map(([x, y]) =>
    `<path d="M${x - 38} ${y + 40} L${x} ${y - 20} L${x + 38} ${y + 40}" fill="#c4b38a" stroke="#6b5636" stroke-width="2"/><path d="M${x} ${y - 20} L${x - 10} ${y - 2} L${x + 4} ${y + 4}" fill="#efe6cf" stroke="none"/>`).join("");
  const trees = [[90, 360], [120, 390], [70, 410], [140, 350], [440, 470], [480, 500], [410, 510], [600, 330], [640, 350], [570, 360], [330, 130], [360, 100]].map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="15" fill="#8d9a5e" stroke="#4e5a2e" stroke-width="2"/><line x1="${x}" y1="${y + 15}" x2="${x}" y2="${y + 24}" stroke="#4e5a2e" stroke-width="3"/>`).join("");
  const reeds = [[110, 230], [130, 250], [170, 240], [210, 225], [90, 215], [225, 250]].map(([x, y]) =>
    `<path d="M${x} ${y} q-4 -18 2 -30 M${x + 6} ${y} q2 -16 8 -24 M${x - 6} ${y} q-6 -12 -10 -20" stroke="#4e5a2e" stroke-width="2" fill="none"/>`).join("");
  const L = "#3b2a1a";
  const ICONS = {
    s0: (x, y) => `<g transform="translate(${x} ${y - 62})"><rect x="-9" y="-6" width="18" height="30" fill="#b8a88a" stroke="${L}" stroke-width="2"/><path d="M-12 -6 L0 -22 L12 -6 Z" fill="#4a5a8a" stroke="${L}" stroke-width="2"/><line x1="0" y1="-22" x2="0" y2="-32" stroke="${L}" stroke-width="1.5"/><path d="M0 -32 L9 -29 L0 -26 Z" fill="#7a2418"/><rect x="-3" y="2" width="6" height="7" fill="#ffd34d" class="glow"/></g>`,
    s1: (x, y) => `<g transform="translate(${x} ${y - 60})">${[[-18, 4], [0, -2], [18, 4]].map(([dx, dy]) => `<rect x="${dx - 8}" y="${dy}" width="16" height="14" fill="#cdb98e" stroke="${L}" stroke-width="2"/><path d="M${dx - 11} ${dy} L${dx} ${dy - 11} L${dx + 11} ${dy} Z" fill="#8a2a1e" stroke="${L}" stroke-width="2"/><rect x="${dx - 2}" y="${dy + 6}" width="4" height="8" fill="${L}"/>`).join("")}</g>`,
    s2: (x, y) => `<g transform="translate(${x} ${y - 62})"><rect x="-4" y="-8" width="22" height="24" fill="#b8a88a" stroke="${L}" stroke-width="2"/><path d="M-7 -8 L7 -20 L21 -8 Z" fill="#6b4a2a" stroke="${L}" stroke-width="2"/><g class="wheel"><circle cx="-12" cy="6" r="12" fill="none" stroke="${L}" stroke-width="2.5"/>${[0, 45, 90, 135].map((a) => `<line x1="${-12 + 12 * Math.cos(a * Math.PI / 180)}" y1="${6 + 12 * Math.sin(a * Math.PI / 180)}" x2="${-12 - 12 * Math.cos(a * Math.PI / 180)}" y2="${6 - 12 * Math.sin(a * Math.PI / 180)}" stroke="${L}" stroke-width="2"/>`).join("")}</g></g>`,
    s3: (x, y) => `<g transform="translate(${x} ${y - 58})"><g class="bob"><path d="M-22 6 L22 6 L15 16 L-15 16 Z" fill="#6b4a2a" stroke="${L}" stroke-width="2"/><line x1="0" y1="6" x2="0" y2="-26" stroke="${L}" stroke-width="2.5"/><path d="M2 -24 L18 2 L2 2 Z" fill="#efe6cf" stroke="${L}" stroke-width="2"/><path d="M-2 -20 L-16 2 L-2 2 Z" fill="#d9a441" stroke="${L}" stroke-width="2"/><path d="M0 -26 L10 -23 L0 -20 Z" fill="#7a2418"/></g></g>`,
    s4: (x, y) => `<g transform="translate(${x} ${y - 64})"><path d="M-8 20 L-5 -14 L5 -14 L8 20 Z" fill="#efe6cf" stroke="${L}" stroke-width="2"/><rect x="-6" y="-4" width="12" height="5" fill="#7a2418"/><rect x="-6" y="8" width="12" height="5" fill="#7a2418"/><rect x="-7" y="-22" width="14" height="8" fill="#3b2a1a"/><circle cx="0" cy="-18" r="4" fill="#ffd34d" class="glow"/><circle cx="0" cy="-18" r="14" fill="#ffd34d" opacity=".25" class="glow"/><path d="M-9 -22 L0 -30 L9 -22 Z" fill="#7a2418" stroke="${L}" stroke-width="2"/></g>`,
    s6: (x, y) => `<g transform="translate(${x} ${y - 60})"><rect x="-18" y="-4" width="36" height="22" fill="#cdb98e" stroke="${L}" stroke-width="2"/><path d="M-22 -4 L0 -20 L22 -4 Z" fill="#3e6b5a" stroke="${L}" stroke-width="2"/>${[-11, 0, 11].map((dx) => `<rect x="${dx - 3}" y="4" width="6" height="14" fill="${L}"/>`).join("")}<line x1="0" y1="-20" x2="0" y2="-32" stroke="${L}" stroke-width="1.5"/><path d="M0 -32 L10 -29 L0 -26 Z" fill="#d9a441" class="glow"/></g>`,
    s5: (x, y) => `<g transform="translate(${x} ${y - 60})" class="sway">${[-14, 0, 14].map((dx, k) => `<path d="M${dx} 16 Q${dx - 8} 2 ${dx} -8 Q${dx + 6} -16 ${dx + 2} -20" fill="none" stroke="#3e6b5a" stroke-width="6" stroke-linecap="round"/><circle cx="${dx + 3}" cy="-21" r="4.5" fill="#3e6b5a"/><circle cx="${dx + 4}" cy="-22" r="1.3" fill="#ffd34d"/>`).join("")}<path d="M-26 16 Q0 8 26 16" fill="#7fa0a8" stroke="#5d7270" stroke-width="2"/></g>`,
  };
  const revealed = S.revealed || [];
  const newly = [];
  const fog = (x, y, clearing) => `<g class="fog ${clearing ? "clearing" : ""}" aria-hidden="true">${[[-60, -30, 46], [-10, -50, 52], [45, -25, 48], [-40, 25, 44], [20, 30, 50], [70, 15, 36], [-80, 10, 30]].map(([dx, dy, r]) => `<circle cx="${x + dx}" cy="${y + dy}" r="${r}"/>`).join("")}</g>`;
  const nodes = sites.map((s, i) => {
    const [x, y] = pos[i];
    const lab = s.state === "locked" && !s.id ? "?" : s.num;
    const opt = s.id === "s0" && s.state !== "done";
    const sub = s.state === "done" ? "✓ complete" : opt ? "optional" : s.state === "open" ? "▶ play" : s.id ? "locked" : "coming soon";
    const locked = s.state === "locked";
    const clearing = !locked && s.id && !["s0", "s1"].includes(s.id) && !revealed.includes(s.id);
    if (clearing) newly.push(s.id);
    const icon = ICONS[s.id] ? `<g transform="translate(${x} ${y - 40}) scale(1.25) translate(${-x} ${-(y - 40)})">${ICONS[s.id](x, y)}</g>` : "";
    return `${icon}<g class="node ${s.state}" ${s.id && s.state !== "locked" ? `tabindex="0" role="button" data-session="${s.id}" aria-label="${esc(s.place)}: ${esc(s.title)}, ${sub}"` : `aria-hidden="true"`}>
      ${s.state === "open" && s.id === rec ? `<circle class="pulse" cx="${x}" cy="${y}" r="26"/>` : ""}
      <circle class="ring" cx="${x}" cy="${y}" r="26"/>
      <text class="num" x="${x}" y="${y}">${lab}</text>
      <text class="lbl" x="${x}" y="${y + 50}">${esc(s.place)}</text>
      <text class="sublbl" x="${x}" y="${y + 70}">${sub}</text>
    </g>${locked || clearing ? fog(x, y, clearing) : ""}`;
  }).join("");
  if (newly.length) { S.revealed = [...revealed, ...newly]; save(); }
  return `<svg viewBox="0 0 1000 640" role="img" aria-label="Map of the Hollow Vale">
    <defs><filter id="fogblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter><filter id="rough"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n"/><feColorMatrix in="n" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.08"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter></defs>
    <rect width="1000" height="640" fill="#dccca4" filter="url(#rough)"/>
    <path d="M0 600 Q 220 570 470 605 T 1000 590 L1000 640 L0 640 Z" fill="#9fb3b0" stroke="#5d7270" stroke-width="2"/>
    <text class="mapnote" x="520" y="628">the Grey Sea</text>
    <path d="M620 0 C 560 120, 470 180, 440 275 S 330 380, 250 455 S 200 560, 190 595" fill="none" stroke="#7fa0a8" stroke-width="16" stroke-linecap="round"/>
    <path d="M620 0 C 560 120, 470 180, 440 275 S 330 380, 250 455 S 200 560, 190 595" fill="none" stroke="#b9d0d2" stroke-width="6" stroke-linecap="round"/>
    ${mountains}${trees}${reeds}
    <path d="M70 200 q40 -30 90 -10 q40 20 80 -5" fill="none" stroke="#6b7d4a" stroke-width="2" stroke-dasharray="3 5"/>
    <path d="${route}" fill="none" stroke="#7a2418" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>
    <path d="${sideRoute}" fill="none" stroke="#7a2418" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round" opacity=".7"/>
    <text class="maptitle" x="500" y="44" text-anchor="middle">The Hollow Vale</text>
    <g transform="translate(940 520)"><circle r="28" fill="none" stroke="#6b5636" stroke-width="1.5"/><path d="M0 -26 L6 0 L0 26 L-6 0 Z" fill="#7a2418"/><text x="0" y="-32" text-anchor="middle" class="mapnote" style="font-style:normal;font-family:var(--display)">N</text></g>
    ${nodes}
  </svg>`;
}

function continueHTML() {
  const inProg = (id) => { const p = S.progress[id]; return p && !p.done && p.step >= 1 && (p.step > 1 || Object.keys(p.solved || {}).length || Object.keys(p.code || {}).length); };
  let sid = S.current && inProg(S.current) ? S.current : SESSIONS.find((x) => inProg(x.id))?.id;
  let label = "Continue";
  if (!sid) { sid = recommended(); label = "Start"; }
  if (!sid) return "";
  const sess = sessionOf(sid), p = S.progress[sid] || { step: 1 };
  const ch = sess.chapters[Math.min(p.step, sess.chapters.length) - 1];
  return `<button class="contcard" id="contBtn" data-go="${sid}"><canvas class="portrait" id="contArt" width="64" height="64" aria-hidden="true"></canvas>
    <span><small>${label} · Session ${sess.num} · ${esc(sess.place)}</small><strong>${esc(ch.title)}</strong></span><span class="contgo">▶</span></button>`;
}

function renderMap() {
  $("track").innerHTML = "";
  const doneCount = SESSIONS.filter((x) => S.progress[x.id]?.done).length;
  const list = [...SESSIONS.map((s, i) => ({ s, state: sessionState(i) })), ...FUTURE.map((f) => ({ s: f, state: "soon" }))];
  $("stage").innerHTML = `
    <div class="card mapcard">
      <div class="maphead">
        <div><div class="dm-label">THE CAMPAIGN MAP</div><h2 class="chapter">Where to next, ${esc(S.name)}?</h2></div>
        <div class="eyebrow">${doneCount} of ${SESSIONS.length + FUTURE.length} quests complete</div>
      </div>
      ${continueHTML()}
      ${S.newToR && !S.progress.s0?.done ? `<div class="maptip">New to R? Start at the <b>Apprentice's Tower</b>. It's short, and it teaches the basics. You can skip it anytime.</div>` : ""}
      <div class="mapwrap" id="mapwrap">${mapSVG()}</div>
      <div class="maphint">← drag the map to explore →</div>
      <div class="sessions">
        ${list.map(({ s, state }) => `<button class="sess ${state}" ${state === "open" || state === "done" ? `data-session="${s.id}"` : "disabled"}>
          <span class="badge">${s.num}</span>
          <span><strong>${esc(s.title)}</strong><span>${esc(s.place)} · ${esc(s.topic)}</span></span>
          <span class="state">${state === "done" ? "✓ replay" : s.optional ? (s.id === recommended() ? "▶ start here" : "optional") : state === "open" ? "▶ play" : state === "locked" ? "locked" : "coming soon"}</span>
        </button>`).join("")}
      </div>
    </div>`;
  if ($("contArt")) drawSprite($("contArt"), sessionOf($("contBtn").dataset.go).npc);
  const mw = $("mapwrap"), target = mw.querySelector(".node .pulse")?.parentNode || mw.querySelector(".node.open") || mw.querySelector(".node.done");
  if (target && mw.scrollWidth > mw.clientWidth) {
    const ring = target.querySelector(".ring");
    const cx = parseFloat(ring.getAttribute("cx")) / 1000 * mw.scrollWidth;
    mw.scrollLeft = Math.max(0, cx - mw.clientWidth / 2);
  }
  if ($("contBtn")) $("contBtn").addEventListener("click", () => openSession($("contBtn").dataset.go));
  document.querySelectorAll("[data-session]").forEach((el) => {
    el.addEventListener("click", () => openSession(el.dataset.session));
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSession(el.dataset.session); } });
  });
}

async function openSession(sid) {
  const prog = P(sid);
  if (prog.done && prog.step > sessionOf(sid).chapters.length) { prog.step = 1; prog.solved = {}; prog.guesses = {}; }
  S.current = sid; S.view = "session"; save(); render(); window.scrollTo({ top: 0, behavior: "smooth" });
  if (rReady) await prepareSession(sid);
}

function renderChapter(sess, prog) {
  const st = sess.chapters[prog.step - 1];
  const solved = prog.solved[st.id];
  const guess = prog.guesses[st.id];
  const iq = interpFor(sess, st);
  const interpDone = !iq || prog.interp[st.id]?.done;
  const enemyHP = st.enemy ? (solved ? (interpDone ? 0 : Math.ceil(st.enemy.hp / 2)) : st.enemy.hp) : 0;
  const needsGuess = st.predict && !guess;
  const ready = rReady && preparedFor === sess.id;
  $("stage").innerHTML = `
    <div class="card">
      <div class="chead">
        <canvas class="portrait" id="npcArt" width="64" height="64" aria-hidden="true"></canvas>
        <div><div class="dm-label">THE DUNGEON MASTER SPEAKS · ${sess.story ? "STORY MODE" : `SESSION ${sess.num}`}</div>
        <h2 class="chapter">${st.title}</h2>
        <div class="npcname">With ${esc(NPC_NAMES[st.npc || sess.npc] || "")}</div></div>
      </div>
      <div class="narration">${st.story.map((p) => `<p>${p}</p>`).join("")}</div>
      ${st.enemy ? `<div class="enemy" id="enemyBox"><canvas id="enemyArt" width="96" height="96" aria-hidden="true"></canvas><div><div class="enemy-name">${st.enemy.name}</div><small>${st.enemy.note} HP ${enemyHP}/${st.enemy.hp}</small><div class="hp"><div id="hpbar" style="width:${(enemyHP / st.enemy.hp) * 100}%"></div></div></div></div>` : ""}
      ${st.predict ? `<div class="task"><b>Predict first.</b> ${st.predict.q}<div class="choices">${st.predict.options.map((o) => `<button class="choice ${guess === o.v ? "picked" : ""}" data-guess="${o.v}">${esc(o.label)}</button>`).join("")}</div>${guess ? `<div class="reveal">Your guess is sealed. Now find out.</div>` : ""}</div>` : ""}
      ${needsGuess ? "" : `<div class="task"><b>Your quest.</b> ${st.task}</div><div class="hints" id="hints">${hintsHTML(sess, prog, st)}</div>`}
    </div>
    ${needsGuess ? "" : `
    <div class="card" style="padding:0;border:0;background:none">
      <div class="editor-wrap">
        <div class="editor-bar"><span>spell.R · fill in the ____ blanks</span><span>Ctrl/⌘ + Enter to cast</span></div>
        <div class="symbar" role="toolbar" aria-label="Insert symbols">${SYMBOLS.map(([ins, label]) => `<button type="button" class="sym" data-ins="${esc(ins)}" aria-label="Insert ${esc(label)}">${esc(label)}</button>`).join("")}</div>
        <div class="codebox"><pre class="hl" id="hl" aria-hidden="true"></pre><textarea id="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="R code editor">${esc(prog.code[st.id] ?? st.starter)}</textarea></div>
        <div class="actions">
          <button class="btn" id="runBtn" ${ready ? "" : "disabled"}>Cast spell</button>
          <button class="btn ghost" id="resetBtn">Restore starter spell</button>
          <button class="btn ghost" id="viewBtn" ${ready ? "" : "disabled"}>📜 View data</button>
          ${solved && interpDone ? `<button class="btn red" id="nextBtn">Continue the adventure →</button>` : ""}
        </div>
        <pre class="out" id="out">${ready ? "Output appears here." : "R is still being summoned. Read the story meanwhile."}</pre>
        <div class="visions" id="visions"></div>
      </div>
      <div class="verdict" id="verdict"></div>
      ${solved && iq ? interpHTML(sess, prog, st, iq) : ""}
    </div>`}`;
  drawSprite($("npcArt"), st.npc || sess.npc);
  if (st.enemy) {
    const beaten = !!solved && interpDone;
    drawSprite($("enemyArt"), st.enemy.art, { grey: beaten });
    const key = sess.id + ":" + st.id, box = $("enemyBox");
    if (beaten) box.classList.add("defeated");
    if (lastEnemy.key === key && enemyHP < lastEnemy.hp) { box.classList.add("hit"); setTimeout(() => box.classList.remove("hit"), 600); }
    lastEnemy = { key, hp: enemyHP };
  }
  document.querySelectorAll("[data-guess]").forEach((b) => b.addEventListener("click", () => { prog.guesses[st.id] = b.dataset.guess; save(); render(); }));
  if (needsGuess) return;
  const ta = $("code");
  syncHL();
  errMark = null;
  ta.addEventListener("input", () => { prog.code[st.id] = ta.value; save(); errMark = null; syncHL(); });
  ta.addEventListener("scroll", () => { $("hl").scrollTop = ta.scrollTop; $("hl").scrollLeft = ta.scrollLeft; });
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Tab") { e.preventDefault(); const s = ta.selectionStart; ta.setRangeText("    ", s, ta.selectionEnd, "end"); prog.code[st.id] = ta.value; save(); syncHL(); }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); cast(); }
  });
  $("runBtn").addEventListener("click", cast);
  $("viewBtn").addEventListener("click", openViewer);
  document.querySelectorAll(".sym").forEach((b) => {
    b.addEventListener("pointerdown", (e) => e.preventDefault());
    b.addEventListener("click", () => {
      const ins = b.dataset.ins, s0 = ta.selectionStart, s1 = ta.selectionEnd;
      ta.focus(); ta.setRangeText(ins, s0, s1, "end");
      if (ins === "()" || ins === "[]" || ins === '""') ta.selectionStart = ta.selectionEnd = s0 + 1;
      prog.code[st.id] = ta.value; save(); errMark = null; syncHL();
    });
  });
  $("resetBtn").addEventListener("click", () => { ta.value = st.starter; prog.code[st.id] = st.starter; save(); syncHL(); });
  if ($("nextBtn")) $("nextBtn").addEventListener("click", advance);
  bindHints(sess, prog, st);
  if (solved && iq) bindInterp(sess, prog, st, iq);
  if (solved) showVerdict(true, solved, st, prog);
}

function hintsHTML(sess, prog, st) {
  const h = helpFor(sess, st); if (!h) return "";
  const tier = prog.tier[st.id] || 0, fails = prog.fails[st.id] || 0;
  const solved = !!prog.solved[st.id], revealed = !!prog.revealed[st.id];
  const baseXP = sess.xp || 100, revealXP = Math.round(baseXP * REVEAL_XP / 100);
  let html = `<div class="hints-head"><span class="dm-label">THE DM'S HELP</span><span class="hint-dots" aria-label="Hints unlocked: ${tier} of 2">${[1, 2].map((i) => `<i class="${i <= tier ? "on" : ""}"></i>`).join("")}</span></div>`;
  if (tier >= 1) html += `<div class="hint"><b>Nudge.</b> ${h.nudge}</div>`;
  if (tier >= 2) html += `<div class="hint"><b>Clue.</b> ${h.clue}</div>`;
  if (revealed) {
    html += `<div class="hint reveal-box"><b>The answer.</b><pre>${esc(h.answer)}</pre><div>${h.why}</div>
      ${solved ? "" : `<button class="btn ghost" id="useAnswer">Put it in the editor</button>`}</div>`;
  }
  const row = [];
  if (!solved && tier < 2) row.push(`<button class="btn ghost small" id="hintRoll">🎲 Roll for a ${tier ? "clue" : "nudge"}</button>`);
  if (!solved && !revealed && fails >= 2 && h.answer) row.push(`<button class="btn ghost small warn" id="revealBtn">Reveal the answer · only ${revealXP} XP</button>`);
  if (row.length) html += `<div class="hint-actions">${row.join("")}</div>`;
  html += `<div class="hint-note" id="hintNote">${solved ? "" : fails >= 2 || revealed ? "" : `The answer can be revealed after 2 failed casts. Failed casts so far: ${fails}.`}</div>`;
  return html;
}
function refreshHints(sess, prog, st) { const box = $("hints"); if (!box) return; box.innerHTML = hintsHTML(sess, prog, st); bindHints(sess, prog, st); }
function bindHints(sess, prog, st) {
  if ($("hintRoll")) $("hintRoll").addEventListener("click", () => rollForHint());
  if ($("revealBtn")) $("revealBtn").addEventListener("click", () => {
    prog.revealed[st.id] = true; save(); refreshHints(sess, prog, st);
  });
  if ($("useAnswer")) $("useAnswer").addEventListener("click", () => {
    const ta = $("code"); ta.value = helpFor(sess, st).answer; prog.code[st.id] = ta.value; save(); syncHL();
    ta.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function interpHTML(sess, prog, st, iq) {
  const state = prog.interp[st.id] || {};
  const boss = !!st.enemy;
  const picked = state.picked || [];
  return `
    <div class="card interp ${state.done ? "done" : ""}" id="interp">
      <div class="dm-label">${boss ? "SECOND PHASE · ANSWER THE CHALLENGE" : "THE DM ASKS"}</div>
      <p class="iq">${iq.q}</p>
      <div class="iopts">${iq.options.map((o) => {
        const was = picked.includes(o.v);
        const cls = was ? (o.ok ? "right" : "wrong") : "";
        return `<button class="iopt ${cls}" data-iv="${o.v}" ${state.done ? "disabled" : ""}><span>${esc(o.t)}</span>${was ? `<small>${o.why}</small>` : ""}</button>`;
      }).join("")}</div>
      ${state.done ? `<div class="iresult">${state.tries === 1 ? `Right on the first try. +${INTERP_XP} XP.` : "Right. Wrong answers teach too: read why they don't hold."}${boss ? " The enemy falls." : ""}</div>
      <div class="actions" style="padding:10px 0 0;border:0"><button class="btn red" id="nextBtn2">Continue the adventure →</button></div>` : `<div class="iresult muted">${boss ? "The code took half its strength. Answer correctly to finish it." : "Pick the best answer. A wrong pick shows you why it doesn't hold."}</div>`}
    </div>`;
}
function bindInterp(sess, prog, st, iq) {
  document.querySelectorAll("[data-iv]").forEach((b) => b.addEventListener("click", () => {
    const state = prog.interp[st.id] = prog.interp[st.id] || { tries: 0, picked: [] };
    if (state.done || state.picked.includes(b.dataset.iv)) return;
    state.tries += 1; state.picked.push(b.dataset.iv);
    const opt = iq.options.find((o) => o.v === b.dataset.iv);
    if (opt.ok) {
      state.done = true;
      if (state.tries === 1 && !prog.done) gainXP(INTERP_XP, "wisdom");
    }
    save();
    const y = window.scrollY; render(); window.scrollTo(0, y);
    const o2 = $("out"); if (o2 && lastText) o2.textContent = lastText; if (lastImages.length) showImages(lastImages);
  }));
  if ($("nextBtn2")) $("nextBtn2").addEventListener("click", advance);
}

/* ---------- R syntax colours (a highlighted copy sits behind a transparent textarea) ---------- */
const R_TOKEN = /(#[^\n]*)|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?)|(____)|(\b(?:if|else|for|while|in|function|return|TRUE|FALSE|NULL|NA|Inf)\b)|(\b\d+(?:\.\d+)?(?:e[-+]?\d+)?\b)|([A-Za-z_.][\w.]*(?=\s*\())|(<-|->|\$|~|%in%|==|!=|<=|>=|&&|\|\||[&|!])/g;
let errMark = null;
function highlightR(code) {
  return code.split("\n").map((line, k) => `<span class="ln${errMark === k + 1 ? " err" : ""}">${highlightLine(line)}</span>`).join("\n") + "\n";
}
function markLine(n) { errMark = n || null; syncHL(); }
function revealOutput() {
  const o = $("out"); if (!o) return;
  const r = o.getBoundingClientRect();
  if (r.top > window.innerHeight - 80 || r.top < 0) o.scrollIntoView({ behavior: "smooth", block: "start" });
}
function highlightLine(code) {
  let out = "", last = 0, m;
  R_TOKEN.lastIndex = 0;
  while ((m = R_TOKEN.exec(code))) {
    out += esc(code.slice(last, m.index));
    const cls = m[1] ? "c" : m[2] ? "s" : m[3] ? "blank" : m[4] ? "k" : m[5] ? "n" : m[6] ? "f" : "o";
    let inner = esc(m[0]);
    if (cls === "s") inner = inner.replace(/____/g, '<span class="t-blank">____</span>');
    out += `<span class="t-${cls}">${inner}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}
function syncHL() {
  const ta = $("code"), hl = $("hl"); if (!ta || !hl) return;
  hl.innerHTML = highlightR(ta.value);
  ta.style.height = "auto";
  ta.style.height = Math.max(170, ta.scrollHeight + 4) + "px";
  hl.scrollTop = ta.scrollTop;
}

const SYMBOLS = [["$", "$"], [" <- ", "<-"], ["()", "( )"], ["[]", "[ ]"], ['""', '" "'], [", ", ","], [" ~ ", "~"], [" == ", "=="], [" %in% ", "%in%"], [":", ":"], ["____", "____"]];

/* ---------- Data viewer ---------- */
async function openViewer() {
  if (!rReady || preparedFor !== S.current) return;
  let dlg = $("viewer");
  if (!dlg) {
    dlg = document.createElement("div"); dlg.id = "viewer"; dlg.className = "viewer"; dlg.setAttribute("role", "dialog"); dlg.setAttribute("aria-modal", "true"); dlg.setAttribute("aria-label", "Data viewer");
    document.body.appendChild(dlg);
    dlg.addEventListener("click", (e) => { if (e.target === dlg) closeViewer(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeViewer(); });
  }
  const names = (await webR.evalRString(".frames()")).split(",").filter(Boolean);
  if (!names.length) { dlg.innerHTML = `<div class="vpanel"><button class="vclose" id="vclose" aria-label="Close">×</button><p>No data tables in this quest yet.</p></div>`; }
  else {
    dlg.innerHTML = `<div class="vpanel"><div class="vhead"><div class="dm-label">THE LEDGER ROOM</div><button class="vclose" id="vclose" aria-label="Close">×</button></div>
      <div class="vtabs" role="tablist">${names.map((n, i) => `<button role="tab" class="vtab ${i ? "" : "on"}" data-df="${esc(n)}">${esc(n)}</button>`).join("")}</div>
      <div class="vmeta" id="vmeta"></div><div class="vtable" id="vtable"></div>
      <div class="vnote">These are the data frames that exist right now. Tables you create with your own code show up here too.</div></div>`;
    dlg.querySelectorAll(".vtab").forEach((t) => t.addEventListener("click", () => { dlg.querySelectorAll(".vtab").forEach((x) => x.classList.toggle("on", x === t)); showFrame(t.dataset.df); }));
    await showFrame(names.includes(preferredFrame()) ? preferredFrame() : names[0]);
    dlg.querySelectorAll(".vtab").forEach((x) => x.classList.toggle("on", x.dataset.df === (names.includes(preferredFrame()) ? preferredFrame() : names[0])));
  }
  $("vclose").addEventListener("click", closeViewer);
  dlg.classList.add("open"); $("vclose").focus();
}
function preferredFrame() { return { s0: "roster", s1: "df", s2: "ledger", s3: "guild", s4: "almanac", s5: "brews" }[S.current]; }
function closeViewer() { const d = $("viewer"); if (d) d.classList.remove("open"); const v = $("viewBtn"); if (v) v.focus(); }
async function showFrame(name) {
  await webR.objs.globalEnv.bind(".dfname", name);
  const raw = await webR.evalRString(".peek(.dfname)");
  const lines = raw.split("\n");
  const total = parseInt(lines[0], 10), cols = lines[1].split("\t"), types = lines[2].split("\t"), rows = lines.slice(3).map((l) => l.split("\t"));
  $("vmeta").textContent = `${name}: ${total} rows × ${cols.length} columns` + (rows.length < total ? ` · showing the first ${rows.length}` : "");
  $("vtable").innerHTML = `<table><thead><tr><th class="rn">#</th>${cols.map((c, i) => `<th><span>${esc(c)}</span><small>${esc(types[i] || "")}</small></th>`).join("")}</tr></thead>
    <tbody>${rows.map((r, k) => `<tr><td class="rn">${k + 1}</td>${r.map((v, i) => `<td class="${v === "NA" ? "na" : types[i] === "num" ? "num" : ""}">${esc(v)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function renderPrologue() {
  $("track").innerHTML = "";
  $("stage").innerHTML = `
    <div class="card">
      <div class="dm-label">THE DUNGEON MASTER SPEAKS</div>
      <h2 class="chapter">Prologue · Pull Up a Chair</h2>
      <div class="narration">
        <p>The basement smells of pizza and old carpet. Graph paper covers the table. A single lamp hangs low, and the dice are waiting.</p>
        <p><em>“Tonight,”</em> says the Dungeon Master, <em>“you are not a fighter or a thief. You read the hidden patterns of the world. Your weapons are data, and your spells are written in R.”</em></p>
        <p>Every spell you learn goes into your spellbook. Use it whenever you like. Real analysts look things up all the time.</p>
      </div>
      <div class="create">
        <div><label for="heroName">Your character's name</label><input id="heroName" maxlength="28" placeholder="e.g. Lyra Quillfeather" value="${esc(S.name)}"></div>
        <div><label>Choose your class</label>
          <div class="classes">${CLASSES.map((c) => `<button class="cls ${S.cls === c.id ? "picked" : ""}" data-cls="${c.id}"><canvas class="clsart" data-art="${HERO_SPRITE[c.id]}" width="48" height="48" aria-hidden="true"></canvas><strong>${c.name}</strong><span>${c.blurb} +2 ${STAT_NAMES[c.bonus]}.</span></button>`).join("")}</div>
        </div>
        <div><label>Have you written R code before?</label>
          <div class="choices" id="rexp">
            <button class="choice ${S.newToR === false ? "picked" : ""}" data-rexp="yes">Yes, I know the basics</button>
            <button class="choice ${S.newToR === true ? "picked" : ""}" data-rexp="no">No, I'm new to R</button>
          </div>
        </div>
        <div><button class="btn red" id="beginBtn">Open the map</button> <span id="beginMsg" style="color:var(--bad);font-size:16px;margin-left:8px"></span></div>
      </div>
    </div>`;
  document.querySelectorAll(".clsart").forEach((cv) => drawSprite(cv, cv.dataset.art));
  $("heroName").addEventListener("input", (e) => { S.name = e.target.value.trim(); save(); renderSheet(); });
  document.querySelectorAll("[data-cls]").forEach((b) => b.addEventListener("click", () => {
    S.cls = b.dataset.cls; save();
    document.querySelectorAll("[data-cls]").forEach((x) => x.classList.toggle("picked", x === b));
    renderSheet();
  }));
  document.querySelectorAll("[data-rexp]").forEach((btn) => btn.addEventListener("click", () => {
    S.newToR = btn.dataset.rexp === "no"; save();
    document.querySelectorAll("[data-rexp]").forEach((x) => x.classList.toggle("picked", x === btn));
  }));
  $("beginBtn").addEventListener("click", () => {
    if (!S.name || !S.cls) { $("beginMsg").textContent = "Give your character a name and choose a class."; return; }
    if (S.newToR === undefined) { $("beginMsg").textContent = "Tell the DM whether you have written R before."; return; }
    const bonus = CLASSES.find((c) => c.id === S.cls).bonus;
    S.stats = Object.assign({}, DEFAULT.stats); S.stats[bonus] += 2;
    S.view = "map"; save(); render(); window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function renderEpilogue(sess, prog) {
  if (!prog.done) { prog.done = true; save(); renderSpells(); }
  const nextIdx = SESSIONS.indexOf(sess) + 1;
  const next = SESSIONS[nextIdx] || FUTURE[0];
  $("stage").innerHTML = `
    <div class="card">
      <div class="chead">
        <canvas class="portrait" id="npcArt" width="64" height="64" aria-hidden="true"></canvas>
        <div><div class="dm-label">THE DUNGEON MASTER SPEAKS · ${sess.story ? "STORY MODE" : `SESSION ${sess.num}`}</div>
        <h2 class="chapter">Epilogue · ${esc(sess.title)}</h2></div>
      </div>
      <div class="narration">${sess.epilogue(S, prog)}</div>
      <div class="task"><b>${sess.story ? "Story complete." : `Session ${sess.num} complete.`}</b> ${sess.summary} ${esc(S.name)} is level ${S.level} with ${S.xp} XP.</div>
      <div class="actions" style="padding:14px 0 0;border:0">
        <button class="btn red" id="mapBtn">${sess.story ? (prog.testFrom ? "Back to the editor →" : "Back to Story Mode →") : "Back to the map →"}</button>
        <span style="align-self:center;color:var(--muted);font-size:16px">${sess.story ? "" : sess.optional ? "Next on the map: Millbrook." : SESSIONS[nextIdx] ? `New on the map: ${esc(next.place)}.` : "You have completed the whole campaign."}</span>
      </div>
      <p style="margin-top:14px"><button class="reset" id="restart">Start over with a new character</button></p>
    </div>
    ${sess.story ? "" : feedbackHTML(sess)}`;
  if (!sess.story) bindFeedback(sess, prog);
  drawSprite($("npcArt"), sess.npc);
  $("mapBtn").addEventListener("click", goMap);
  $("restart").addEventListener("click", () => { S = JSON.parse(JSON.stringify(DEFAULT)); save(); render(); });
}

/* ---------- Feedback (the DM's notebook) ---------- */
const dbP = window.claude?.use ? window.claude.use("db") : Promise.resolve(null);
const userP = window.claude?.use ? window.claude.use("user") : Promise.resolve(null);
function feedbackHTML(sess) {
  const sent = S.feedbackSent?.[sess.id];
  const pills = (name, opts) => `<div class="choices" role="radiogroup" data-fb="${name}">${opts.map(([v, l]) => `<button type="button" class="choice" role="radio" aria-checked="false" data-v="${v}">${l}</button>`).join("")}</div>`;
  return `
    <div class="card fbcard" id="fbcard">
      <div class="dm-label">THE DM'S NOTEBOOK · FEEDBACK</div>
      <h2 class="chapter">How was this session?</h2>
      ${sent ? `<p class="fbdone">Thanks! Your notes on this session reached the DM. You can send them again if you change your mind.</p>` : `<p class="fbintro">Two minutes. It helps make the next sessions better. Only your answers and your hint use are sent. No name.</p>`}
      <form id="fbform" class="fbform">
        <fieldset><legend>Overall, how much did you enjoy it?</legend>${pills("enjoy", [[1, "1"], [2, "2"], [3, "3"], [4, "4"], [5, "5"]])}</fieldset>
        <fieldset><legend>How hard was the R?</legend>${pills("difficulty", [["easy", "Too easy"], ["right", "About right"], ["hard", "Too hard"]])}</fieldset>
        <fieldset><legend>Did the story help you learn?</legend>${pills("story", [["helped", "It helped"], ["neutral", "No difference"], ["distracted", "It distracted me"]])}</fieldset>
        <fieldset><legend>Which chapter was hardest?</legend>${pills("hardest", [...sess.chapters.map((c) => [c.id, c.short.split(" · ")[0]]), ["none", "None"]])}</fieldset>
        <label for="fbConfused">What confused you, if anything?</label>
        <textarea id="fbConfused" maxlength="1500" rows="3" placeholder="e.g. I didn't get why we use the median"></textarea>
        <label for="fbChange">What would you change or add?</label>
        <textarea id="fbChange" maxlength="1500" rows="3" placeholder="Anything: story, hints, speed, topics…"></textarea>
        <div class="actions" style="padding:6px 0 0;border:0">
          <button class="btn" type="submit" id="fbSend">Send to the DM</button>
          <span class="fbstatus" id="fbStatus" role="status"></span>
        </div>
      </form>
    </div>`;
}
function bindFeedback(sess, prog) {
  const form = $("fbform"); if (!form) return;
  const picked = {};
  form.querySelectorAll("[data-fb]").forEach((g) => g.querySelectorAll(".choice").forEach((b) => b.addEventListener("click", () => {
    picked[g.dataset.fb] = b.dataset.v;
    g.querySelectorAll(".choice").forEach((x) => { const on = x === b; x.classList.toggle("picked", on); x.setAttribute("aria-checked", on ? "true" : "false"); });
  })));
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = $("fbStatus"), btn = $("fbSend");
    const entry = {
      enjoy: picked.enjoy ? Number(picked.enjoy) : null,
      difficulty: picked.difficulty || null,
      story: picked.story || null,
      hardest: picked.hardest || null,
      confused: $("fbConfused").value.trim().slice(0, 1500),
      change: $("fbChange").value.trim().slice(0, 1500),
      newToR: S.newToR ?? null,
      cls: S.cls || null,
      fails: prog.fails || {}, hintTier: prog.tier || {}, revealed: prog.revealed || {},
      sentAt: new Date().toISOString(),
    };
    if (!entry.enjoy && !entry.difficulty && !entry.confused && !entry.change) { status.textContent = "Answer at least one question first."; return; }
    btn.disabled = true; status.textContent = "Sending…";
    let ok = false;
    try {
      const [db, user] = await Promise.all([dbP, userP]);
      if (db && user) {
        const id = await user.id();
        const ref = db.doc("feedback/" + id);
        let cur = {};
        try { const snap = await ref.get(); cur = (snap && (snap.data ? snap.data() : snap)) || {}; } catch (err) {}
        await ref.set(Object.assign({}, cur, { [sess.id]: entry, updatedAt: entry.sentAt }));
        ok = true;
      }
    } catch (err) { console.error(err); }
    btn.disabled = false;
    if (ok) {
      const first = !S.feedbackSent?.[sess.id];
      S.feedbackSent = Object.assign({}, S.feedbackSent, { [sess.id]: true });
      if (first) gainXP(25, "wisdom");
      save(); renderSheet();
      status.textContent = first ? "Sent. Thank you! +25 XP." : "Sent again. Thank you!";
    } else {
      const text = `Feedback for "${sess.title}"\n` + JSON.stringify(entry, null, 2);
      status.innerHTML = `Couldn't send from here. <button type="button" class="reset" id="fbCopy">Copy my answers</button> and send them to whoever shared this game.`;
      $("fbCopy").addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(text); status.textContent = "Copied. Paste it in a message to whoever shared the game."; }
        catch (err) { status.textContent = "Copy was blocked by the browser. Take a screenshot of your answers instead."; }
      });
    }
  });
}

function showVerdict(ok, msg, st, prog) {
  const v = $("verdict");
  v.className = "verdict show " + (ok ? "ok" : "no");
  let extra = "";
  if (ok && st.predict) {
    const g = prog.guesses[st.id];
    const label = st.predict.options.find((o) => o.v === g)?.label || g;
    extra = `<div class="reveal">${g === st.predict.answer ? `You predicted “${esc(label)}”. You were right.` : `You predicted “${esc(label)}”. The data says otherwise. That surprise is the lesson.`}</div>`;
  }
  v.innerHTML = `${ok ? "<b style='color:var(--good)'>Success!</b> " : "<b style='color:var(--bad)'>Not yet.</b> "}${esc(msg)}${extra}${ok ? `<div class="lesson">${st.lesson}</div>` : ""}`;
}

/* ---------- R ---------- */
// Runs user code. Returns [ok, text, images]. Code is passed as an R variable, never pasted into R source.
const plotW = () => (window.innerWidth < 600 ? 460 : 720);
async function rRun(src) {
  await webR.objs.globalEnv.bind(".src", src);
  const shelter = await new webR.Shelter();
  try {
    const cap = await shelter.captureR(".run(.src)", { captureGraphics: { width: plotW(), height: Math.round(plotW() * 0.66), bg: "#efe6cf" } });
    let raw = (await cap.result.toJs()).values[0];
    let errLine = null;
    const j = raw.lastIndexOf("\x02");
    if (j >= 0) { errLine = parseInt(raw.slice(j + 1), 10) || null; raw = raw.slice(0, j); }
    const i = raw.indexOf("\x01");
    const extra = cap.output.filter((o) => o.type === "stderr" || o.type === "stdout").map((o) => o.data).join("\n");
    let text = raw.slice(i + 1) + (extra ? (raw.length > i + 1 ? "\n" : "") + extra : "");
    if (errLine) {
      const nLines = src.split("\n").length;
      errLine = Math.min(Math.max(1, errLine), nLines);
      text = text.replace(/Error: /, `Error on line ${errLine}: `);
    }
    return [raw.slice(0, i) === "1", text, cap.images || [], errLine];
  } finally { shelter.purge(); }
}
async function rCheck(sid, step, nimg) {
  let raw;
  const sess = sessionOf(sid);
  if (sess && sess.story) {
    const ch = sess.chapters[step - 1];
    await webR.objs.globalEnv.bind(".ck", ch.check || "");
    await webR.objs.globalEnv.bind(".cfail", ch.fail || "");
    raw = await webR.evalRString(`.check_story(.ck, .cfail, ${nimg})`);
  } else raw = await webR.evalRString(`.check("${sid}", ${step}, ${nimg})`);
  const i = raw.indexOf("\x01");
  return [raw.slice(0, i) === "1", raw.slice(i + 1)];
}

function showImages(images) {
  const box = $("visions"); if (!box) return;
  box.innerHTML = "";
  images.forEach((img, k) => {
    const wrap = document.createElement("div"); wrap.className = "vision";
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    c.getContext("2d").drawImage(img, 0, 0);
    c.setAttribute("role", "img"); c.setAttribute("aria-label", "Plot drawn by your R code");
    wrap.appendChild(c);
    const cap = document.createElement("small"); cap.textContent = `Vision ${k + 1} of ${images.length}`; wrap.appendChild(cap);
    box.appendChild(wrap);
  });
}

let lastImages = [], lastText = "", lastEnemy = { key: "", hp: 0 };
async function cast() {
  const sess = sessionOf(S.current); const prog = P(sess.id);
  const st = sess.chapters[prog.step - 1];
  if (!rReady || preparedFor !== sess.id) return;
  const src = $("code").value;
  const out = $("out");
  if (src.includes("____")) { out.className = "out err"; out.textContent = "Fill in the ____ blanks before casting."; return; }
  $("runBtn").disabled = true;
  out.className = "out"; out.textContent = "Casting…";
  try {
    const [ok, text, images, errLine] = await rRun(src);
    markLine(errLine);
    lastImages = images; lastText = text || (images.length ? "(a vision appeared below)" : "(the spell ran silently)");
    out.textContent = text || (images.length ? "(a vision appeared below)" : "(the spell ran silently)");
    showImages(images);
    if (!ok) { out.className = "out err"; $("runBtn").disabled = false; noteFail(sess, prog, st); revealOutput(); return; }
    const [pass, msg] = await rCheck(sess.id, st.id, images.length);
    if (pass) {
      const first = !prog.solved[st.id];
      prog.solved[st.id] = msg;
      const base = sess.xp || 100;
      if (first && !prog.done) gainXP(prog.revealed[st.id] ? Math.round(base * REVEAL_XP / 100) : base, st.stat);
      save();
      render();
      const o2 = $("out"); if (o2) o2.textContent = text || (images.length ? "(a vision appeared below)" : "(the spell ran silently)");
      showImages(lastImages);
      revealOutput();
    } else {
      showVerdict(false, msg, st, prog);
      noteFail(sess, prog, st);
      revealOutput();
    }
  } catch (e) {
    out.className = "out err"; out.textContent = String(e && e.message ? e.message : e);
  }
  if ($("runBtn")) $("runBtn").disabled = false;
}

function noteFail(sess, prog, st) {
  if (prog.solved[st.id]) return;
  prog.fails[st.id] = (prog.fails[st.id] || 0) + 1; save();
  refreshHints(sess, prog, st);
}

function gainXP(n, stat) {
  S.xp += n; S.stats[stat] += 1;
  const newLevel = Math.floor(S.xp / 200) + 1;
  if (newLevel > S.level) { S.level = newLevel; flash(`Level ${S.level}!`); }
  else flash(`+${n} XP · +1 ${STAT_NAMES[stat]}`);
}
function flash(text) { const el = $("levelup"); el.textContent = text; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 1600); }

function advance() {
  lastImages = []; lastText = "";
  const prog = P(S.current);
  prog.step += 1;
  save(); render(); window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Dice ---------- */
const d20 = $("d20"), dctx = d20.getContext("2d");
function drawD20(n, glow) {
  const w = d20.width, h = d20.height, cx = w / 2, cy = h / 2, r = 50;
  dctx.clearRect(0, 0, w, h);
  const pts = [];
  for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + i * Math.PI / 3; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
  dctx.beginPath(); pts.forEach((p, i) => (i ? dctx.lineTo(...p) : dctx.moveTo(...p))); dctx.closePath();
  dctx.fillStyle = "#2a0f0d"; dctx.fill();
  dctx.lineWidth = 2; dctx.strokeStyle = glow ? "#ffb648" : "#ff3b30";
  dctx.shadowColor = glow ? "rgba(255,182,72,.8)" : "rgba(255,59,48,.7)"; dctx.shadowBlur = 12; dctx.stroke(); dctx.shadowBlur = 0;
  const tri = [[cx, cy - r * .62], [cx + r * .58, cy + r * .36], [cx - r * .58, cy + r * .36]];
  dctx.beginPath(); tri.forEach((p, i) => (i ? dctx.lineTo(...p) : dctx.moveTo(...p))); dctx.closePath();
  dctx.lineWidth = 1; dctx.strokeStyle = "rgba(255,120,100,.55)"; dctx.stroke();
  [[0, 0], [1, 1], [2, 1], [3, 2], [4, 2], [5, 0]].forEach(([pi, ti]) => { dctx.beginPath(); dctx.moveTo(...pts[pi]); dctx.lineTo(...tri[ti]); dctx.stroke(); });
  dctx.fillStyle = "#ffe9d6"; dctx.font = "30px VT323, monospace"; dctx.textAlign = "center"; dctx.textBaseline = "middle";
  dctx.fillText(String(n), cx, cy + 6);
}
drawD20(20, false);
let rolling = false;
function rollForHint() {
  if (rolling) return;
  const sess = S.view === "session" ? sessionOf(S.current) : null;
  const prog = sess ? P(sess.id) : null;
  const st = sess && prog.step <= sess.chapters.length ? sess.chapters[prog.step - 1] : null;
  const say = (t) => { $("rollResult").textContent = t; const n = $("hintNote"); if (n) n.textContent = t; };
  if (!st || !helpFor(sess, st)) { say("No quest is active. Roll when you face a challenge."); return; }
  const tier = prog.tier[st.id] || 0;
  if (prog.solved[st.id]) { say("This challenge is already beaten."); return; }
  if (tier >= 2) { say("The DM has given every hint. After 2 failed casts you can reveal the answer."); return; }
  rolling = true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const final = 1 + Math.floor(Math.random() * 20);
  let ticks = reduce ? 0 : 14;
  d20.classList.remove("landed"); void d20.offsetWidth; d20.classList.add("rolling");
  const tick = () => {
    if (ticks-- > 0) { drawD20(1 + Math.floor(Math.random() * 20), false); setTimeout(tick, 45 + (14 - ticks) * 6); return; }
    d20.classList.remove("rolling"); d20.classList.add("landed");
    if (final === 20) d20.classList.add("crit"); else d20.classList.remove("crit");
    drawD20(final, final >= 10);
    S.rolls.push(final); renderDiceLog();
    let msg;
    if (final === 20) { prog.tier[st.id] = 2; msg = "Natural 20! The DM tells you everything but the answer."; }
    else if (final >= 10) { prog.tier[st.id] = tier + 1; msg = `You rolled ${final}. The DM gives you a ${tier ? "clue" : "nudge"}.`; }
    else if (final === 1) msg = "Natural 1. The DM just smiles. Roll again, or search your spellbook.";
    else msg = `You rolled ${final}. The DM stays silent. Roll again, or search your spellbook.`;
    save(); refreshHints(sess, prog, st); say(msg);
    rolling = false;
  };
  tick();
}
$("rollBtn").addEventListener("click", rollForHint);


/* ---------- Boot ---------- */
async function prepareSession(sid) {
  const sess = sessionOf(sid); const prog = P(sid);
  preparedFor = null;
  if (sess.story) {
    const st = S.stories[sid];
    await webR.objs.globalEnv.bind(".scsv", st.dataset.csv || "");
    await webR.objs.globalEnv.bind(".sname", st.dataset.name || "data");
    try { await webR.evalRVoid(".setup_story(.scsv, .sname)"); }
    catch (e) { const o = $("out"); if (o) { o.className = "out err"; o.textContent = "The story's data could not be read as CSV: " + e.message; } }
    for (const ch of sess.chapters) {
      if (ch.id >= prog.step) break;
      const src = prog.code[ch.id] && !prog.code[ch.id].includes("____") ? prog.code[ch.id] : storyHelp(sid, ch.id)?.answer;
      if (src) await rRun(src);
    }
    preparedFor = sid;
    if (S.view === "session" && S.current === sid) { const rb = $("runBtn"); if (rb) rb.disabled = false; const vb = $("viewBtn"); if (vb) vb.disabled = false; const o = $("out"); if (o && o.textContent.startsWith("R is still")) o.textContent = "Output appears here."; }
    return;
  }
  await webR.evalRVoid(`.setup_${sid}()`);
  // Replay this session's solved steps so variables like `clean` exist again.
  for (const ch of sess.chapters) {
    if (ch.id >= prog.step) break;
    const src = prog.code[ch.id] ?? ch.starter;
    if (!src.includes("____")) await rRun(src);
    if (ch.keyVar && ch.fix) {
      const KEYCHECK = { ledger: "!is.null(G$ledger$zone) && !is.null(G$ledger$period)", almanac: "!is.null(G$almanac$ma12)", members: "!is.null(G$members$segment)" };
      const ok = await webR.evalRBoolean(KEYCHECK[ch.keyVar] || `.has("${ch.keyVar}")`);
      if (!ok) await rRun(ch.fix);
    }
  }
  preparedFor = sid;
  if (S.view === "session" && S.current === sid) {
    const rb = $("runBtn"); if (rb) rb.disabled = false;
    const vb = $("viewBtn"); if (vb) vb.disabled = false;
    const o = $("out"); if (o && o.textContent.startsWith("R is still")) o.textContent = "Output appears here.";
  }
}

async function boot() {
  const st = $("status");
  const t0 = Date.now();
  const timer = setInterval(() => {
    if (rReady) return clearInterval(timer);
    const s = Math.round((Date.now() - t0) / 1000);
    st.textContent = `Summoning R… ${s} s` + (s > 20 ? " · on mobile this can take up to a minute" : "");
  }, 1000);
  try {
    if (typeof DecompressionStream === "undefined") throw new Error("this browser is too old to unpack R. Please update it");
    const base = new URL("r/", location.href).href;
    const { WebR, ChannelType } = await import(base + "webr.js");
    webR = new WebR({ baseUrl: base, channelType: ChannelType.PostMessage });
    await webR.init();
    await webR.evalRVoid(R_SETUP);
    rReady = true;
    clearInterval(timer);
    st.textContent = "R is ready · cast away";
    st.classList.add("ready");
    if (S.view === "session" && S.current) await prepareSession(S.current);
  } catch (e) {
    clearInterval(timer);
    st.textContent = `R could not load: ${e && e.message ? e.message : e}. Reload to try again.`;
    st.style.color = "var(--bad)";
    console.error(e);
  }
}

load();
(async () => {
  const q = new URLSearchParams(location.search).get("story");
  if (q && S.name && S.cls) {
    try { const st = await decodeStory(q); const id = await addStory(st); S.view = "stories"; save(); history.replaceState(null, "", location.pathname); } catch (e) { console.warn(e); }
  } else if (q) { try { const st = await decodeStory(q); await addStory(st); history.replaceState(null, "", location.pathname); } catch (e) {} }
  document.querySelectorAll("#modes [data-mode]").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.mode === "stories") { S.view = "stories"; } else { S.view = S.name && S.cls ? "map" : "prologue"; }
    save(); render(); window.scrollTo({ top: 0 });
  }));
  render();
  boot();
})();
