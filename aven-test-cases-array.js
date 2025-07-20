export const avenTestCases = [
  {
    name: "Basic Product Understanding",
    description: "Tests agent ability to explain what Aven is and how it works",
    script:
      "1: Greet the assistant.\n2: Ask 'What is the Aven Card and how does it work?'\n3: Wait for the assistant to provide a comprehensive explanation.\n4: End the call.",
    rubric:
      "The assistant should accurately explain that Aven is a credit card that uses home equity to provide low rates, combining the convenience of a credit card with savings of a HELOC. Should mention key features like variable APR (7.49-14.99%), 2% cashback, and ability to use anywhere Visa is accepted.",
  },
  {
    name: "Application Requirements",
    description: "Tests agent knowledge of qualification criteria",
    script:
      "1: Greet the assistant.\n2: Ask 'What are the requirements to qualify for an Aven Card?'\n3: Wait for the assistant to provide detailed eligibility criteria.\n4: End the call.",
    rubric:
      "The assistant should provide accurate eligibility criteria including: home ownership with equity, minimum age 18, valid government ID, acceptable credit score, income verification, property not actively for sale, and mention the automated underwriting system considers income, equity, credit, and debt obligations.",
  },
  {
    name: "Interest Rate Details",
    description: "Tests understanding of variable rate structure",
    script:
      "1: Greet the assistant.\n2: Ask 'How are interest rates determined and what makes them variable?'\n3: Wait for detailed explanation of rate structure.\n4: End the call.",
    rubric:
      "The assistant should explain the variable APR range (7.49-14.99%), mention it's based on Index (WSJ Prime or FFTR-UL) plus margin, explain that rates are determined by automated underwriting based on creditworthiness, and note the 18% maximum cap.",
  },
  {
    name: "Cash Out Feature",
    description: "Tests understanding of cash out functionality and fees",
    script:
      "1: Greet the assistant.\n2: Ask 'How do cash outs work and what fees are involved?'\n3: Wait for explanation of the cash out process.\n4: End the call.",
    rubric:
      "The assistant should explain that cardholders can transfer cash directly from Aven account to bank account at the same low rate, mention the 2.5% transfer fee, explain the process is initiated within 2 business days, and clarify this is different from ATM withdrawals (which aren't allowed).",
  },
  {
    name: "Payment Calculation",
    description: "Tests knowledge of how monthly payments are calculated",
    script:
      "1: Greet the assistant.\n2: Ask 'How are my monthly payments calculated?'\n3: Wait for detailed payment calculation explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that for revolving balances, minimum payment is 1% of principal plus monthly interest. For fixed payment plans, payments are the same each month. Should mention the payment calculator at aven.com/paymentCalculator and explain that multiple plans are added together.",
  },
  {
    name: "Balance Transfers",
    description: "Tests understanding of balance transfer process and terms",
    script:
      "1: Greet the assistant.\n2: Ask 'Can I transfer balances from other credit cards and how does that work?'\n3: Wait for balance transfer explanation.\n4: End the call.",
    rubric:
      "The assistant should confirm balance transfers are available, explain the 2.5% fee, mention the 5-10 day processing time depending on the financial institution, and clarify that transferred balances get the same low Aven rate.",
  },
  {
    name: "Credit Score Impact",
    description: "Tests knowledge of credit inquiry policies",
    script:
      "1: Greet the assistant.\n2: Ask 'Will checking my offer or applying affect my credit score?'\n3: Wait for credit inquiry explanation.\n4: End the call.",
    rubric:
      "The assistant should clearly distinguish between soft pull (checking offer - no credit score impact) and hard pull (only after accepting offer and scheduling notary - may impact credit score). Should mention that Aven uses FICO V9 and VantageScore 4.0 from Experian.",
  },
  {
    name: "Fixed vs Variable Rates",
    description: "Tests understanding of rate options available",
    script:
      "1: Greet the assistant.\n2: Ask 'Do you offer fixed rate options?'\n3: Wait for explanation of fixed rate availability.\n4: End the call.",
    rubric:
      "The assistant should explain that the card has a variable rate, but some cardholders may be able to create fixed payment, fixed rate Simple Loan plans for cash outs and balance transfers. Should mention checking account agreement for specific availability and terms.",
  },
  {
    name: "Fees Structure",
    description: "Tests comprehensive knowledge of all fees",
    script:
      "1: Greet the assistant.\n2: Ask 'What fees does Aven charge?'\n3: Wait for comprehensive fee breakdown.\n4: End the call.",
    rubric:
      "The assistant should list no annual fee, no origination fee, no application fee, no prepayment penalty. Should mention 2.5% fee for cash outs and balance transfers, $29 late fee, and possible first-draw fees for select customers. Should note county recording fees for lines over $25,000.",
  },
  {
    name: "Card Activation and Delivery",
    description: "Tests knowledge of card delivery and activation process",
    script:
      "1: Greet the assistant.\n2: Ask 'How long until I get my card and how do I activate it?'\n3: Wait for delivery and activation details.\n4: End the call.",
    rubric:
      "The assistant should explain cards arrive within 7 business days of account opening, mention the 3-day rescission period before funds can be accessed, explain activation through the Aven Card app at my.aven.com, and note that some cardholders may receive early cash-out codes by mail.",
  },
  {
    name: "Usage Restrictions",
    description: "Tests knowledge of where and how the card can be used",
    script:
      "1: Greet the assistant.\n2: Ask 'Where can I use my Aven Card and are there any restrictions?'\n3: Wait for usage details and restrictions.\n4: End the call.",
    rubric:
      "The assistant should explain the card can be used anywhere Visa is accepted for purchases, but list restrictions: no ATM withdrawals, no casinos, no timeshares, no money transfer businesses, no cryptocurrency exchanges, no foreign countries on US sanctions list.",
  },
  {
    name: "Cashback Rewards",
    description: "Tests understanding of rewards program",
    script:
      "1: Greet the assistant.\n2: Ask 'How does the cashback program work?'\n3: Wait for cashback explanation and redemption process.\n4: End the call.",
    rubric:
      "The assistant should explain 2% unlimited cashback on purchases when autopay is enabled, clarify that balance transfers and cash outs don't earn cashback, explain redemption through the app becomes statement credit, and note cashback cannot be used for minimum payment requirements.",
  },
  {
    name: "Home Sale Scenario",
    description: "Tests knowledge of account closure when home is sold",
    script:
      "1: Greet the assistant.\n2: Ask 'What happens to my Aven account if I sell my house?'\n3: Wait for home sale procedure explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that the settlement agent will send a payoff request to Aven, the account will be closed when balance is paid in full, and Aven will release the lien. Should emphasize that full payoff is required when selling.",
  },
  {
    name: "Refinancing Scenarios",
    description: "Tests understanding of refinancing implications",
    script:
      "1: Greet the assistant.\n2: Ask 'Can I refinance my mortgage while keeping my Aven account open?'\n3: Wait for refinancing explanation.\n4: End the call.",
    rubric:
      "The assistant should distinguish between two scenarios: 1) Keeping Aven open while refinancing first mortgage (Aven will work with lender on subordination agreement), and 2) Closing Aven account during refinance (requires payoff quote, account gets blocked from new charges).",
  },
  {
    name: "Investment Property Eligibility",
    description: "Tests knowledge of second home and rental property programs",
    script:
      "1: Greet the assistant.\n2: Ask 'Can I get an Aven Card for my rental property or second home?'\n3: Wait for investment property program explanation.\n4: End the call.",
    rubric:
      "The assistant should confirm Aven has programs for both primary residences and second homes/investment properties. Should mention application routes to correct program based on property type, requirement to show property address on driver's license/tax return/paystub, and limitation of one active account per person.",
  },
  {
    name: "Trust and LLC Properties",
    description: "Tests knowledge of entity-owned property eligibility",
    script:
      "1: Greet the assistant.\n2: Ask 'Can I apply if my home is held in a trust or LLC?'\n3: Wait for entity ownership explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that Aven supports homes held in one Revocable Family Trust but does not support properties held by multiple trusts or in an LLC. Should be specific about the single trust limitation.",
  },
  {
    name: "Flood Zone Properties",
    description: "Tests knowledge of flood zone eligibility and requirements",
    script:
      "1: Greet the assistant.\n2: Ask 'Can I get an Aven Card if my home is in a flood zone?'\n3: Wait for flood zone eligibility and requirements.\n4: End the call.",
    rubric:
      "The assistant should confirm flood zone properties are supported, explain flood insurance requirements during application, mention condo-specific requirements (building + individual policy), explain renewal notice system (45 and 15 day reminders), and future flood zone designation procedures.",
  },
  {
    name: "Bankruptcy History",
    description: "Tests knowledge of bankruptcy eligibility requirements",
    script:
      "1: Greet the assistant.\n2: Ask 'Can I qualify if I've had a bankruptcy in the past?'\n3: Wait for bankruptcy eligibility explanation.\n4: End the call.",
    rubric:
      "The assistant should explain the automated underwriting requirements: 12 months since bankruptcy discharge/dismissal, 24 months since last mortgage delinquency/forbearance, and 48 months since foreclosure/mortgage default. Should emphasize these are automated system requirements.",
  },
  {
    name: "Income Verification Methods",
    description: "Tests knowledge of income verification options",
    script:
      "1: Greet the assistant.\n2: Ask 'How do you verify my income for the application?'\n3: Wait for income verification options.\n4: End the call.",
    rubric:
      "The assistant should list bank account connection and document upload options. Documents include Form 1040, pay stubs, W2, 1099-R, 1099-SSA, 1099-B, retirement income, benefit income. Should mention self-employed applicants are accepted and may contact support for more details.",
  },
  {
    name: "Spouse Signature Requirements",
    description: "Tests knowledge of when spouse signatures are needed",
    script:
      "1: Greet the assistant.\n2: Ask 'Does my spouse need to sign if they're not on the title?'\n3: Wait for spouse signature explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that if spouse isn't on title and applicant believes signature isn't required, they need to provide a quitclaim deed or interspousal transfer deed showing spouse isn't a property owner. Should suggest contacting county recorder's office for more information.",
  },
  {
    name: "Maximum Credit Limits",
    description: "Tests knowledge of credit limit maximums and determination",
    script:
      "1: Greet the assistant.\n2: Ask 'What's the maximum credit limit I can get?'\n3: Wait for credit limit information.\n4: End the call.",
    rubric:
      "The assistant should state the maximum line size is currently $250,000, mention it's determined by automated underwriting based on income, equity, credit, and debt obligations, and note that limits cannot be adjusted manually after the automated system generates an offer.",
  },
  {
    name: "Pre-payment Policies",
    description: "Tests knowledge of prepayment penalties and policies",
    script:
      "1: Greet the assistant.\n2: Ask 'Are there penalties for paying off my balance early?'\n3: Wait for prepayment policy explanation.\n4: End the call.",
    rubric:
      "The assistant should clearly state there are no prepayment penalties, confirm cardholders can pay more than minimum, make extra payments, or full payoff. Should mention the important wire transfer requirement for payoffs (60-day wait for lien release with other methods) and that this wait period cannot be waived.",
  },
  {
    name: "Statement and Account Access",
    description: "Tests knowledge of how to access account information",
    script:
      "1: Greet the assistant.\n2: Ask 'How do I access my statements and account information?'\n3: Wait for account access explanation.\n4: End the call.",
    rubric:
      "The assistant should direct to the Aven Card app and my.aven.com for statements and account access. Should mention statements are generated monthly near the anniversary of signup, payment due dates are highlighted in statements and app, and various account details are accessible online.",
  },
  {
    name: "Tax Implications",
    description: "Tests knowledge of tax deductibility and forms",
    script:
      "1: Greet the assistant.\n2: Ask 'Are the interest payments tax deductible?'\n3: Wait for tax deductibility explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that Aven is a Home Equity Line of Credit and will issue Form 1098s for accounts with $0.01+ interest paid during the year. Should clearly state that cardholders need to consult tax rules or a tax advisor to determine deductibility. Should mention interest may be deductible for home improvement projects.",
  },
  {
    name: "Lost or Stolen Card",
    description: "Tests knowledge of lost/stolen card procedures",
    script:
      "1: Greet the assistant.\n2: Ask 'What should I do if my card is lost or stolen?'\n3: Wait for lost card procedure explanation.\n4: End the call.",
    rubric:
      "The assistant should direct cardholders to freeze the card through the Aven Card app, explain how to request a replacement, and provide the specific URL: my.aven.com/reportLostOrStolen. Should emphasize the app-based solution for security.",
  },
  {
    name: "Credit Limit Increases",
    description: "Tests knowledge of credit limit increase policies",
    script:
      "1: Greet the assistant.\n2: Ask 'How can I get a higher credit limit?'\n3: Wait for credit limit increase explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that Aven offers limited 'invitation-only' credit limit increases, that eligible cardholders will be notified via email or phone, and that Aven is not currently accepting credit line increase requests. Should emphasize the invitation-only nature of the program.",
  },
  {
    name: "Mortgage Payment Requirements",
    description: "Tests knowledge of mortgage payment history requirements",
    script:
      "1: Greet the assistant.\n2: Ask 'Do my mortgage payments need to be current to qualify?'\n3: Wait for mortgage payment history requirements.\n4: End the call.",
    rubric:
      "The assistant should explain that Aven's underwriting system reviews mortgage payment history for eligibility determination and will not accept applicants with mortgages that have been delinquent or in forbearance during the last 24 months.",
  },
  {
    name: "Interest Calculation Methods",
    description: "Tests understanding of how interest is calculated",
    script:
      "1: Greet the assistant.\n2: Ask 'How do you calculate interest on my account?'\n3: Wait for detailed interest calculation explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that interest calculation depends on balance type. For purchases: daily accrual (APR/365), waived if paid in full by due date. For balance transfers/cash outs: daily accrual from disbursement. For fixed payment plans: daily accrual at plan APR or fixed monthly fee. Should mention Average Daily Balance method for revolving balances.",
  },
  {
    name: "Property Appraisal Process",
    description: "Tests knowledge of home valuation process",
    script:
      "1: Greet the assistant.\n2: Ask 'Do I need to get an appraisal of my home?'\n3: Wait for appraisal process explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that Aven's automated system estimates home value using industry-leading technologies and provides this service at no cost to the customer. Should emphasize no traditional appraisal is required.",
  },
  {
    name: "Account Inactivity",
    description: "Tests knowledge of inactive account policies",
    script:
      "1: Greet the assistant.\n2: Ask 'What happens if I don't use my account for a while?'\n3: Wait for inactivity policy explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that Aven may reduce the credit line at account anniversary if unused, mention that a lien remains on the home for the approved line amount, and note that certain products may require an initial draw. Should reference account agreement for specific terms.",
  },
  {
    name: "Payment Methods",
    description: "Tests knowledge of available payment options",
    script:
      "1: Greet the assistant.\n2: Ask 'How can I make payments on my account?'\n3: Wait for payment method explanation.\n4: End the call.",
    rubric:
      "The assistant should explain payments are made through the Aven Card app at my.aven.com, mention connecting bank account with routing/account number, note that checks and cash by mail are not accepted, and explain that existing online banking platforms can also be used for bill pay.",
  },
  {
    name: "Offer Validity Period",
    description: "Tests knowledge of offer acceptance timeframes",
    script:
      "1: Greet the assistant.\n2: Ask 'How long do I have to accept my offer?'\n3: Wait for offer timeline explanation.\n4: End the call.",
    rubric:
      "The assistant should state applicants have 30 calendar days to accept and finish signing after which the offer expires. Should mention that any requested additional documentation (income, tax, trust documents) must be provided within the same 30-day window.",
  },
  {
    name: "Debt Protection Program",
    description: "Tests knowledge of debt protection insurance alternative",
    script:
      "1: Greet the assistant.\n2: Ask 'What is debt protection and how does it work?'\n3: Wait for debt protection program explanation.\n4: End the call.",
    rubric:
      "The assistant should explain debt protection covers involuntary job loss, provides up to $50,000 total/$1,000 monthly for 6 months, costs $0.92/$1,000 balance (single) or $1.75/$1,000 (joint), requires under 70 years old and 24+ hours/week employment, and clarify it's not insurance but a contractual liability policy with Securian Financial.",
  },
  {
    name: "Multiple HELOC Accounts",
    description: "Tests knowledge of policies regarding multiple HELOCs",
    script:
      "1: Greet the assistant.\n2: Ask 'Can I have another HELOC with a different lender while having an Aven account?'\n3: Wait for multiple account policy explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that Aven has no control over other lenders' approval processes, confirm that someone with an Aven account would need to communicate directly with other lenders about additional HELOCs, but should also note Aven's own limitation of one active account per person.",
  },
  {
    name: "Lien Position Requirements",
    description: "Tests knowledge of lien position policies",
    script:
      "1: Greet the assistant.\n2: Ask 'What lien position does Aven require?'\n3: Wait for lien position explanation.\n4: End the call.",
    rubric:
      "The assistant should state that Aven requires first or second lien position and does not take third position liens. Should mention that Aven offers a refinance product for applicants with existing second liens if they qualify.",
  },
  {
    name: "Application Denial Appeals",
    description: "Tests knowledge of appeal process for denied applications",
    script:
      "1: Greet the assistant.\n2: Ask 'If I get denied, can I appeal the decision?'\n3: Wait for denial appeal policy explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that Aven's automated underwriting system cannot be overridden or appealed, as decisions are generated automatically based on income, equity, credit, and debt obligations. Should mention denied applicants can reapply after at least 6 months from denial date.",
  },
  {
    name: "Bank Partnership Details",
    description: "Tests knowledge of banking partnership and FDIC coverage",
    script:
      "1: Greet the assistant.\n2: Ask 'Who actually provides the credit and are my funds FDIC insured?'\n3: Wait for banking partnership explanation.\n4: End the call.",
    rubric:
      "The assistant should explain the partnership with Coastal Community Bank (Member FDIC, NMLS #462289), clarify that Aven Cards are issued by Coastal Community Bank pursuant to Visa license, and emphasize the FDIC insurance protection through this traditional bank partnership.",
  },
  {
    name: "Address Validation Issues",
    description: "Tests knowledge of address validation problems and solutions",
    script:
      "1: Greet the assistant.\n2: Ask 'My address isn't showing up in your application. What should I do?'\n3: Wait for address validation solution.\n4: End the call.",
    rubric:
      "The assistant should explain that the application doesn't support recent builds, mobile homes, or recently purchased properties. Should mention 4-6 week delay for properties to appear from recording time. Should direct to 'Enter address manually' option if auto-complete fails.",
  },
  {
    name: "HELOC vs Traditional Credit Card",
    description: "Tests ability to compare Aven to traditional credit cards",
    script:
      "1: Greet the assistant.\n2: Ask 'How is Aven different from a regular credit card?'\n3: Wait for comparison explanation.\n4: End the call.",
    rubric:
      "The assistant should highlight key differences: much lower APR (7.49-14.99% vs 24%+ average), uses home equity as collateral, requires lien on property, offers cash-out functionality, balance transfer capabilities, but comes with home risk. Should emphasize the rate savings benefit.",
  },
  {
    name: "International Usage",
    description: "Tests knowledge of international card usage policies",
    script:
      "1: Greet the assistant.\n2: Ask 'Can I use my Aven Card when traveling internationally?'\n3: Wait for international usage explanation.\n4: End the call.",
    rubric:
      "The assistant should clarify that while the card works anywhere Visa is accepted, it cannot be used in foreign countries on the US sanctions list. Should be specific about this restriction while confirming general international Visa acceptance.",
  },
  {
    name: "Pay It Forward Program",
    description: "Tests knowledge of referral program mechanics",
    script:
      "1: Greet the assistant.\n2: Ask 'How does the Pay It Forward referral program work?'\n3: Wait for referral program explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that new cardholders receive a personal invite code to share, recipients who use the code get a signing bonus as statement credit, recipients can choose to share a portion with the referrer, and referrers are limited to receiving from 10 recipients per month. Should mention the signing bonus depends on final deed recording and card activation.",
  },
  {
    name: "Credit Bureau Reporting",
    description: "Tests knowledge of how account is reported to credit bureaus",
    script:
      "1: Greet the assistant.\n2: Ask 'How is my Aven account reported to credit bureaus?'\n3: Wait for credit reporting explanation.\n4: End the call.",
    rubric:
      "The assistant should clearly state that the Aven Card will be reported to credit bureaus as a Home Equity Line of Credit, not as a traditional credit card. This is important for credit profile understanding.",
  },
  {
    name: "Autopay Setup and Benefits",
    description: "Tests knowledge of autopay features and advantages",
    script:
      "1: Greet the assistant.\n2: Ask 'What are the benefits of setting up autopay and how do I do it?'\n3: Wait for autopay explanation.\n4: End the call.",
    rubric:
      "The assistant should explain autopay benefits including 0.25% APR discount for new cardholders (if enrolled by end of first billing cycle) and eligibility for 2% cashback rewards. Should mention adding/removing bank accounts through the app or my.aven.com/card, and clarify autopay is not required.",
  },
  {
    name: "Purchase Refunds",
    description: "Tests knowledge of how refunds affect payments",
    script:
      "1: Greet the assistant.\n2: Ask 'How do purchase refunds affect my minimum payment?'\n3: Wait for refund policy explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that purchase refunds reduce statement balance but don't count toward minimum payment due, with one exception: if there's only one purchase that gets fully refunded to bring statement balance to zero, there will be no minimum payment for that cycle.",
  },
  {
    name: "Form 1098 Tax Documents",
    description: "Tests knowledge of tax form issuance and contents",
    script:
      "1: Greet the assistant.\n2: Ask 'Will I receive tax forms for the interest I pay?'\n3: Wait for tax form explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that Form 1098 is issued for accounts with $10+ interest paid during the year, available in app under 'Account > Documents', explain Box 1 (interest paid) vs Box 2 (principal amounts), and emphasize consulting tax advisor for deductibility determination.",
  },
  {
    name: "Merchant Authorization Holds",
    description: "Tests knowledge of pending transaction discrepancies",
    script:
      "1: Greet the assistant.\n2: Ask 'Why is my pending transaction amount different from what I actually spent?'\n3: Wait for authorization hold explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that merchants like gas stations and restaurants request authorization for estimated amounts before completing with final amounts, and that pre-authorizations for hotels/car rentals work similarly. Should clarify this is standard merchant behavior, not Aven-specific.",
  },
  {
    name: "Account Closure Process",
    description: "Tests knowledge of how to close an account",
    script:
      "1: Greet the assistant.\n2: Ask 'How do I close my Aven account?'\n3: Wait for account closure procedure.\n4: End the call.",
    rubric:
      "The assistant should explain the process: send payoff letter request to support@aven.com, pay balance in full, Aven processes lien release and closes account. Should emphasize requesting payoff quote to support@aven.com and mention that ACH payments can delay the process significantly.",
  },
  {
    name: "Late Payment Consequences",
    description: "Tests knowledge of late payment policies and consequences",
    script:
      "1: Greet the assistant.\n2: Ask 'What happens if I miss a payment or pay late?'\n3: Wait for late payment policy explanation.\n4: End the call.",
    rubric:
      "The assistant should explain the $29 late fee, clarify that one or two late payments won't put home at risk, mention hardship services availability, and note that accounts may be blocked if no payment by next statement. Should emphasize multiple support options before home risk.",
  },
  {
    name: "Deceased Co-owner Situation",
    description: "Tests knowledge of procedures when a co-owner dies",
    script:
      "1: Greet the assistant.\n2: Ask 'My spouse who was a co-owner has passed away. What do I need to do?'\n3: Wait for deceased co-owner procedure explanation.\n4: End the call.",
    rubric:
      "The assistant should explain the requirement to email a copy of the death certificate to support@aven.com, mention that Aven's application team will review within 10 business days, and note that additional documentation may be required to complete the process.",
  },
  {
    name: "Initial Draw Requirements",
    description:
      "Tests knowledge of minimum draw requirements for new accounts",
    script:
      "1: Greet the assistant.\n2: Ask 'Do I have to take out a minimum amount when I first get my card?'\n3: Wait for initial draw requirement explanation.\n4: End the call.",
    rubric:
      "The assistant should explain that some offers have initial draw requirements (check account agreement), and specifically for lines above $100,000, if the draw in first 90 days is less than $50,000, Aven may reduce the line size to the outstanding amount plus $25,000. Should reference account agreement for specific terms.",
  },
];