/* ---------- Interpretation questions: after the code works, the DM asks what it means ---------- */
const INTERPRET = {
  s1: {
    2: { q: "You filled the gaps with the median, not the mean. Why is that a sensible choice here?",
         options: [
           { v: "a", t: "The median always gives a higher value, so it is safer.", why: "Not always. The median can be higher or lower than the mean. It depends on the shape of the data." },
           { v: "b", t: "A few extreme years can't drag the median around the way they drag the mean.", ok: true, why: "Right. One flood year would pull the mean up. The median only cares about the middle value." },
           { v: "c", t: "The mean can't be computed when values are missing.", why: "It can, with na.rm = TRUE, just like the median. The reason is robustness, not possibility." },
           { v: "d", t: "It makes no difference which one you use.", why: "Here the two are close, but with skewed data the choice changes the result. That's why analysts note it." } ] },
    5: { q: "The Rotwarden sneers: “So what? A correlation of 0.97. What does that prove?” What can you honestly claim?",
         options: [
           { v: "a", t: "The mill causes the failed harvests.", why: "Not yet. Correlation shows a link. Something else near the mill could cause both. You'll test the cause in the next quest." },
           { v: "b", t: "97% of fields are affected by the mill.", why: "A correlation is not a share of fields. It measures how tightly two variables move together." },
           { v: "c", t: "Fields near the mill have much lower yields, so the mill is a strong suspect worth testing.", ok: true, why: "Exactly. A strong link points you where to look. Proving cause needs more, like an experiment." },
           { v: "d", t: "Distance explains exactly 97% of the variation in yield.", why: "Close, but no. The share of variation explained is r squared: 0.97² ≈ 0.94, or about 94%." } ] },
  },
  s2: {
    3: { q: "Near fields dropped by about 25 bushels after 1978. Far fields dropped by about 4. Why do you need the far fields at all?",
         options: [
           { v: "a", t: "They show what would have happened without the mill, like a bad year that hits everyone.", ok: true, why: "Yes. Far fields are the control group. Their small drop is the background change. The extra drop near the mill is the mill's shadow." },
           { v: "b", t: "They have bigger harvests, so they make the average more reliable.", why: "Their level doesn't matter here. What matters is how much they changed." },
           { v: "c", t: "More fields always means a more accurate answer.", why: "More data helps, but the point is the comparison. Without a control group you can't separate the mill from the weather." },
           { v: "d", t: "We don't really need them. The near fields' drop proves the mill's effect.", why: "Not on its own. The drop could be bad weather. The far fields let you subtract that out." } ] },
    4: { q: "The t-test gave p ≈ 0.000003. What does this p-value tell you?",
         options: [
           { v: "a", t: "There is a 0.0003% chance that the ditch has no effect.", why: "This is the most common misreading. The p-value assumes no effect and asks how surprising the data are. It is not the probability that “no effect” is true." },
           { v: "b", t: "If the ditch truly did nothing, a gap this large would almost never happen by chance.", ok: true, why: "Exactly right. That's the definition. A tiny p-value makes “just luck” a poor explanation." },
           { v: "c", t: "The ditch raises the harvest by a very large amount.", why: "The p-value says nothing about size. A tiny effect can have a tiny p-value with enough data. Look at the effect size for that." },
           { v: "d", t: "The result is 99.9997% certain to be correct.", why: "A p-value is not a certainty about your conclusion. It's a statement about the data under the assumption of no effect." } ] },
    5: { q: "In Chapter III you had a strong pattern too. Why can you now claim the mill is the cause?",
         options: [
           { v: "a", t: "Because the p-value is below 0.05.", why: "Old records can have tiny p-values too, and still be confounded. The p-value isn't what makes this causal." },
           { v: "b", t: "Because the effect is large, about 17 bushels.", why: "A large effect can still come from a hidden cause. Size alone doesn't prove anything." },
           { v: "c", t: "Because a coin decided which plots got the ditch, so the groups differ only by the ditch and chance.", ok: true, why: "Yes. Random assignment balances every other factor on average. That's what turns a difference into a cause." },
           { v: "d", t: "Because the trial used plots close to the mill.", why: "Closeness keeps the trial relevant, but it's the randomisation that makes it causal." } ] },
  },
  s3: {
    4: { q: "The odds ratio for complaints is about 2.07. How should Ilsa read that?",
         options: [
           { v: "a", t: "Each extra complaint doubles the probability that a customer leaves.", why: "Close, but this is the classic mistake. It doubles the odds, not the probability. Going from 10% to 20% is a doubling of probability, but not of odds." },
           { v: "b", t: "Each extra complaint roughly doubles the odds of leaving, holding the other traits fixed.", ok: true, why: "Right. Odds are p / (1 − p). An odds ratio multiplies them. And “holding the others fixed” matters, because the model adjusts for them." },
           { v: "c", t: "207% of customers who complain leave.", why: "A share can't be above 100%. An odds ratio is a multiplier, not a percentage of customers." },
           { v: "d", t: "Complaints are proven to cause customers to leave.", why: "This model uses observational data. It shows a strong association, not a proven cause. Remember the Old Mill." } ] },
    5: { q: "The 20 customers on the list have an average risk of about 76%. What is the most important caveat before spending gifts on them?",
         options: [
           { v: "a", t: "None. The model says they will leave, so gifts are certain to help.", why: "A high risk doesn't mean a gift will change their mind. Some may leave whatever you do." },
           { v: "b", t: "76% means 76 of the 20 customers will leave.", why: "It's an average probability. You'd expect about 15 of the 20 to leave without action." },
           { v: "c", t: "High risk doesn't mean persuadable. A small trial with and without gifts would show if gifts actually help.", ok: true, why: "Exactly. Targeting by risk is a start. Testing the gift, like the Elder's trial, tells you whether it works." },
           { v: "d", t: "The model is useless because no prediction is certain.", why: "Uncertain isn't useless. The list is far better than picking customers at random." } ] },
  },
  s4: {
    3: { q: "Why does a 12-month moving average make the seasonal wave disappear?",
         options: [
           { v: "a", t: "Averaging always flattens every pattern.", why: "If that were true, the trend would vanish too. It doesn't." },
           { v: "b", t: "Each 12-month window contains every calendar month exactly once, so the highs and lows cancel out.", ok: true, why: "Yes. Every window holds one winter and one summer. The seasonal bumps sum to roughly zero, and the trend is what remains." },
           { v: "c", t: "It removes outliers from the data.", why: "It smooths them a little, but that's not why the season disappears." },
           { v: "d", t: "Twelve is a lucky number in the Tower.", why: "The DM appreciates the spirit. But twelve matters because a year has twelve months." } ] },
    5: { q: "Your model forecasts about 370 barrels for next December. How much should Odo trust that number?",
         options: [
           { v: "a", t: "Fully. The model fits the past very well.", why: "A good fit to the past doesn't guarantee the future. A new shipping route or a mild winter would break it." },
           { v: "b", t: "Not at all. Nobody can predict the future.", why: "Too pessimistic. The forecast is a reasonable estimate if the patterns hold." },
           { v: "c", t: "It's a good estimate if trend and season continue. He should add a prediction interval and a small safety margin.", ok: true, why: "Right. A forecast extends the past. An interval shows the uncertainty, so Odo can decide how much spare oil to keep." },
           { v: "d", t: "It's exact, because the model includes every month.", why: "Including every month captures the season, but random variation remains. Each month will miss a bit." } ] },
  },
  s5: {
    2: { q: "R² went up, even though 24 of the ingredients do nothing. Why?",
         options: [
           { v: "a", t: "Some of those ingredients must secretly matter.", why: "You built them as pure noise. They don't. The rise comes from somewhere else." },
           { v: "b", t: "R² measures how well a model predicts new brews.", why: "No. R² measures fit on the data the model learned from. That's exactly the problem." },
           { v: "c", t: "Each extra variable can fit a bit of the random noise in the training data, so R² never goes down.", ok: true, why: "Exactly. Even noise lines up with the outcome by chance in a small sample. The model uses it, and R² creeps up." },
           { v: "d", t: "The data has a mistake.", why: "The data are fine. This is how R² always behaves when you add variables." } ] },
    5: { q: "The Hydra boasts: “My training error is only 1.5. Yours is higher!” Why do you still reject the big model?",
         options: [
           { v: "a", t: "A training error that low is impossible, so it must be a bug.", why: "It's possible, and common. With many variables a model can fit its training data very closely." },
           { v: "b", t: "Its error on unseen brews is much larger. The gap shows it memorised noise.", ok: true, why: "Yes. Training error rewards memorising. Test error measures what you actually care about: predicting new brews." },
           { v: "c", t: "Simple models are always better.", why: "Not always. Sometimes the extra variables really help. You know here because the test error tells you." },
           { v: "d", t: "The simple model used more data.", why: "Both learned from the same 40 brews. The difference is how many variables they used." } ] },
  },
  s6: {
    2: { q: "Why scale the columns before clustering?",
         options: [
           { v: "a", t: "Scaling makes the clusters appear.", why: "Scaling doesn't create groups. It changes how distance is measured, so every trait gets a fair vote." },
           { v: "b", t: "Without it, basket_gold, with the biggest numbers, would dominate the distances.", ok: true, why: "Right. A difference of 100 gold would swamp a difference of 5 visits. After scaling, one standard deviation counts the same in every column." },
           { v: "c", t: "R can't compute distances on unscaled data.", why: "It can. The result would just be dominated by the largest-scale column." },
           { v: "d", t: "It removes outliers.", why: "Scaling keeps outliers. They are still far from the mean, just in standard-deviation units." } ] },
    3: { q: "In the dendrogram, what does the height of a join tell you?",
         options: [
           { v: "a", t: "How many members are in the group.", why: "Group size shows in how many leaves hang below a branch, not in its height." },
           { v: "b", t: "How different the two groups were when they were merged.", ok: true, why: "Yes. Low joins merge members who are alike. High joins merge groups that are far apart. Big jumps in height are good places to cut." },
           { v: "c", t: "The order in which members joined the guild.", why: "The tree knows nothing about time. It only uses the distances between members." },
           { v: "d", t: "How much gold the group spends.", why: "Height is a dissimilarity, built from all four scaled traits, not from one column." } ] },
    5: { q: "The Crowd tries one last trick: “Clustering always finds groups. So your segments mean nothing!” How do you answer?",
         options: [
           { v: "a", t: "It's right. Clustering results can't be trusted.", why: "Too pessimistic. Clusters can be checked, and these ones hold up." },
           { v: "b", t: "Clustering only finds groups that truly exist.", why: "That's the Crowd's point, and it's half true: the algorithm will split even random data. That's why you check." },
           { v: "c", t: "True, it always returns groups. But these are clear in the plot, well separated in the tree, and have profiles Ilsa can act on.", ok: true, why: "Exactly. Judge clusters by separation, stability and usefulness. Here the plot, the big jump in the tree and the distinct profiles all agree." },
           { v: "d", t: "The segments are proven because Ward's method was used.", why: "The method choice matters, but no method proves that groups exist. The evidence comes from checking the result." } ] },
  },
};
const INTERP_XP = 25;
