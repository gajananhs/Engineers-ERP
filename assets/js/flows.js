/* Gururaj Engineers Pvt. Ltd. — process flows. EDIT THIS FILE to change the app's content.
 * step  = "Heading — detail text"            plain step   (prefix "!" = negative end, e.g. loss)
 *       | {q:"Question", b:[["Branch label",[steps…]], …]}   decision with branches
 *       | {t:"Heading — detail", a:"A1"}       step that links to an annexure checklist
 * kind: "flow" (steps) | "groups" (title + list of items) | "check" (tickable checklist)                  */
window.GE_FLOWS = [
{ id:"sales", n:"Sales", ic:"📈", kind:"flow", s:"Lead to order confirmation", steps:[
 "Sales lead — IndiaMART, Mail, WhatsApp / Verbal",
 {q:"Lead qualified?", b:[
  ["Disqualified",["!Disqualified Leads Report"]],
  ["Qualified",[
   {q:"Customer type", b:[["Trader",["More discount"]],["End user",["Less discount"]]]},
   "Inquiry — collect product description, part code & photo",
   {q:"Customer", b:[
    ["Existing customer",[{q:"Order type", b:[["Repeat order",["Verify last supply price and duration in GE / GEPL"]],["New items inquiry",[]]]}]],
    ["New customer",[]]]},
   "Technical need (if any) — Project Engineer / R&D visits site, assesses the issue, creates a new BOM; management reviews it and Sales prepares the updated quote",
   {t:"Create Sales Quotation (S.Q.)", a:"A1"},
   "Discuss any technical queries with the customer (if necessary)",
   "Negotiate the quotation details with the customer",
   {q:"Customer response", b:[
    ["Agree",["Win the deal — order confirmation secured","Receive Purchase Order (P.O.) confirmation, if applicable — verify document details","Forward S.Q. and P.O. to Operations Dept. for sales order and related documentation"]],
    ["Disagree",["Revised Sales Quotation after negotiation","!Loss the deal — Loss Inquiry Report with justification"]]]}
  ]]]}
]},
{ id:"ops", n:"Sales Order & Operations", ic:"🧾", kind:"flow", s:"Sales order to fulfilment route", steps:[
 {t:"Create the sales order — from the client's S.Q. or P.O., verifying every detail; complete anything missing or pending first. Bill To / Ship To address, GST number, payment terms, delivery / programming terms, quantity, part code, stock in GE / GEPL with latest price (goods in SAP)", a:"A1"},
 "Discuss any technical queries with the customer (if necessary)",
 {q:"Product type", b:[
  ["Customized product / panel",["Inputs per Project Engineer / R&D or client requisition","Design Dept. creates new GAD, wiring diagram and BOM","Approval of design by customer (amend per comments)","Approval by Design Head, with Project Engineer / R&D","Make control copies and get approval by authorized person"]],
  ["Standard goods",["Issue the standard BOM, wiring diagram and General Arrangement Design (GAD)"]]]},
 "Confirm availability of physical goods / services on the basis of the SO",
 {q:"Goods or services", b:[
  ["Goods",[{q:"Availability", b:[
    ["Available",["Plan dispatch with the client → Dispatch flow"]],
    ["Not available",[{q:"Item type", b:[["Trading goods",["Purchase Requisition from Store → Purchase flow"]],["Manufacturing goods",["Drawing & BOM released by Design to Production","R&D / Planning releases the Work Order → Production flow"]]]}]]]}]],
  ["Services",[{q:"Service type", b:[
    ["Maintenance service",[{q:"Contract", b:[["On demand",[]],["Annual contract",[]]]},"Service provided by engineer","MOM received from engineer for invoicing → Dispatch / Invoicing"]],
    ["Repair work",["Product received from customer for repair and servicing → Service flow"]]]}]]]}
]},
{ id:"purchase", n:"Purchase", ic:"🛒", kind:"flow", s:"Requisition to vendor order", steps:[
 "Purchase Requisition (P.R.) from Store to Purchasing — selecting the correct part code is crucial",
 {q:"Verify item classification", b:[
  ["Standard items",["Procured exclusively from the chosen vendor"]],
  ["Non-standard items",["Vendor inquiry — request for information & quotation",{t:"Verify the details of the quotation", a:"A2"},"Compare the quotations received","Evaluate the discount structure and price list"]]]},
 "Negotiate to secure the best deal — faster delivery, better pricing and higher credit terms are the top priority",
 "Create the purchase order after confirming all necessary approvals and authorizations",
 "Receive vendor confirmation of the purchase by call, message or email",
 "Follow up on the status of the purchase order",
 "Store receives the materials and completes documentation; awaiting confirmation from Store"
]},
{ id:"store", n:"Store", ic:"📦", kind:"flow", s:"Receipt, issue and stock", steps:[
 "Upon receiving material, confirm it matches the P.R. requirements",
 "Generate Goods Receipt Note (GRN) to update stock — verify and enter Company Name, GST No., Invoice Number, Date, Amount, Quantity, Material Code and QC Status",
 "Obtain the Director's signature on the purchase invoice and submit it to Accounts for compliance",
 {q:"Production needs material (per BOM)", b:[
  ["Stock available",["Issue materials based on the BOM specifications"]],
  ["Stock not available",["Submit a Purchase Requisition to Purchasing for the required materials"]]]},
 "Finished goods from Production are received via Completion Report in SAP (with serial numbers) and stock is updated",
 "For dispatch: verify physical stock, provide serial numbers and quantities to Dispatch, pack per the packing list / delivery challan"
]},
{ id:"production", n:"Production", ic:"🏭", kind:"flow", s:"Work order to finished goods", steps:[
 "Design Dept. releases Drawing & BOM to Production",
 "R&D / Planning releases the Work Order, based on BOM and Drawing Number",
 "Production requests materials from Store for manufacturing",
 "Material verification based on BOM and drawing specifications",
 "Assemble parts according to drawing specifications",
 "Wire parts according to drawing specifications",
 "Wiring inspection and testing procedures",
 "Confirm quality — finishing, physical condition and colour coating inspection",
 "Power-on test mode — product inspection to ensure it operates correctly",
 "Convert to finished goods with serial number",
 "Transfer finished goods to Store via Completion Report in SAP and update stock"
]},
{ id:"design", n:"Design", ic:"📐", kind:"flow", s:"Drawings, BOM and approvals", steps:[
 {q:"Product type", b:[
  ["Standard goods",["Issue the standard BOM","Issue the standard wiring diagram","Issue the standard GAD for the standard product","Production prepares using the previously received BOM and GAD — no extra effort from Design"]],
  ["Customized product / panel",["Inputs per Project Engineer / R&D or client requisition","Create General Arrangement Design (GAD) for the customized / new product","New wiring diagram","New BOM","Approval of design by customer (amend as per comments in report)","Approval by Design Head, with Project Engineer / R&D","Make control copies and get approval by authorized person"]]]},
 "Drawing and BOM released by Design to Production"
]},
{ id:"rnd", n:"R&D / Planning", ic:"🔬", kind:"flow", s:"Requirement to production release", steps:[
 "Requirement analysis — gather client specifications: power ratings, functionality, safety standards",
 "Design phase — design the equipment: circuit configuration, component selection (breakers, transformers, relays) and integration",
 "Prototyping — build a prototype (assembly and wiring); test basic functionality against design parameters",
 "Testing & evaluation — load, safety and performance tests against safety standards, efficiency and durability",
 "Finalization — approve the final design; prepare wiring diagrams and user manuals",
 "Production & integration — finalized product released for production and integration with the customized product"
]},
{ id:"dispatch", n:"Dispatch", ic:"🚚", kind:"flow", s:"Delivery challan to invoice", steps:[
 "Confirm dispatch details and requirements with the Sales & Dispatch representative",
 "Verify availability of physical goods based on the S.O.; plan dispatch with the client",
 "If the customer requires a PI, send it promptly; request payment confirmation from A/C",
 "Ask Store for serial numbers and quantities of the items available",
 "Issue the packing list and inform Store to pack accordingly",
 "Generate the delivery challan based on the Sales Order",
 "Generate the tax invoice from the delivery challan in SAP and Tally — three copies: original for customer, duplicate for transporter, triplicate for us",
 "Ensure documents include e-waybill, delivery challan (DC) and e-invoice",
 "Dispatch the materials; notify client and sales person of shipment status and delivery date",
 "Collect the client-signed triplicate copy of the DC from Store for records",
 "File invoice copies by date and serial number for compliance",
 "Services / AMC — the tax invoice is generated from the MOM (on-demand service or repair: invoice created directly from MOM, SO not booked)"
]},
{ id:"service", n:"Service (Annexure 3)", ic:"🛠️", kind:"flow", s:"Repair and servicing", steps:[
 "Product received from customer for repair and servicing as requested",
 "Verify warranty status of the items received",
 {q:"Warranty", b:[["Within warranty",["Charges apply only for replaced parts"]],["Out of warranty",["Charges apply for replaced parts and additional service fees"]]]},
 "Assign the product to the respective person to identify the required repair work",
 {q:"Product type", b:[["Standard product",["Send to the respective vendor / company for handling or service"]],["Non-standard product",["Send to the respective person within the organization"]]]},
 "Inform the customer about the repair work and obtain confirmation of the repair cost before proceeding",
 {q:"Customer response", b:[["Agrees with the price",["Contact the customer to provide company details for payment","Send the product to the respective person / vendor for repair"]],["Disagrees with the price",["Return the product and recover courier charges, if applicable"]]]},
 "Prepare a service report after the repair is completed",
 "Provide all necessary details to Dispatch for invoice generation",
 "Dispatch material and provide dispatch details to the customer and respective person"
]},
{ id:"accounts", n:"Accounts", ic:"💰", kind:"groups", s:"Payments, compliance, reports", groups:[
 ["Purchase invoice handling",["Verify purchase invoice details (Company Name, GST Number, Date, Amount) against the GRN","Account the AP invoice and record the SAP AP invoice number on the invoice","File the AP invoice systematically for record-keeping","Contact the respective person if the invoice is missing or ITC is not provided"]],
 ["GST",["Check SAP and Tally data against tax invoices and credit notes","Check for invoice cancellations or amendments in the GST portal","Prepare GSTR-1 working and send data to the CA for filing","2B reconciliation with the GST portal on the 14th of each month (ITC)","Prepare GSTR-3B working and send to the CA before the 17th–18th of the next month"]],
 ["Payments & collections",["Vendor payments every 10-day cycle, as per the agreed credit period","Receivable collection — follow up as per the agreed credit period"]],
 ["Statutory compliance (before due dates)",["TDS payment — 7th","GSTR-1 — 10th; GSTR-3B — 20th","PF, ESIC and Professional Tax challans — 15th","Advance tax — 15th of each quarter","Leave encashment payment — January","LWF payment — June & December","Other statutory returns and payments per company schedule"]],
 ["Reports",["MIS report and cash flow — every Friday","Budgeting, turnover comparison, expenses comparison, cash report, sales presentation — monthly","Salary payment — 7th of next month"]],
 ["Daily tasks",["Cash and bank entries","Reconciliation of cash and bank transactions"]]
]},
{ id:"hr", n:"Human Resources", ic:"👥", kind:"groups", s:"People processes", groups:[
 ["Hiring",["Recruitment — identify vacancies, create job descriptions, post ads, screen candidates","Interviewing — schedule and conduct interviews, assess skills, select","Onboarding verification — prepare offer letters, verify documents, provide training and orientation"]],
 ["Employees",["Employee management — monitor performance, payroll, benefits, records","Training & development — assess needs, organize programs, track progress","Employee relations — conflict resolution, surveys, policy compliance","Offboarding — process resignations / terminations, exit interviews, update records","Employee engagement — monthly motivation programs, Employee of the Month trophies and certificates, birthdays, farewells"]],
 ["Payroll",["Compile attendance into the muster roll, get approval, send to consultants for wage sheets, forward final salary reports to Accounts","Statutory compliance — PF, ESIC, PT, LWF and apprentice compliance; review portals regularly"]],
 ["Administration",["Holiday list circular — prepare and circulate the annual list","Petrol conveyance documentation — verify and keep records","Employee ID cards — issue and renew","Housekeeping and first-aid supplies — keep stocked and replenish","Invoice management — verify, sign for approval, file, submit to Accounts"]]
]},
{ id:"admin", n:"Admin", ic:"🗂️", kind:"groups", s:"Office operations", groups:[
 ["Daily operations",["Internet connection — keep stable and uninterrupted","Notice board — update with announcements and memos","Employee IN/OUT log","Attendance report generation and review","Visitor management & inquiry handling","Meeting coordination — daily staff / department meetings, weekly HOD meetings, circulars and MOM"]],
 ["Records",["Outward challan record keeping","Incoming post, cheque and service invoice entry (Google Sheets)","Cheque deposit tracking"]],
 ["Facilities",["Cleaning & maintenance oversight — desks, washrooms, solar panels, fans, ACs, water purifiers","Energy consumption tracking — MGVCL and solar readings","Annual Maintenance Contracts — ACs, water purifiers, computers, software, generator, electrical instruments","Waste management — scrap disposal (cardboard, paper, non-metal electrical waste)","Technical issue reporting — escalate system errors to the right department"]],
 ["People support",["Interview scheduling and HR assistance","New employee onboarding formalities"]]
]},
{ id:"A1", n:"Annexure 1 — SAP order checklist", ic:"✅", kind:"check", s:"Booking sales quotation / sales order", groups:[
 ["1. Customer details verification",["Ensure the customer is registered in SAP","Verify billing and shipping addresses"]],
 ["2. Sales order creation",["Choose the correct sales order type (goods, service, etc.)","Enter the customer's P.O. number and date"]],
 ["3. Material and pricing details",["All items (electrical panels, related items) entered with correct material codes and descriptions","Verify quantity and unit of measure","Confirm correct pricing, discounts and taxes","If the quote or supply reference is very old, check and revise the price","If needed, request a product photo from Store, referencing the last order from Standard Supply"]],
 ["4. Availability check",["Materials in stock (SAP and physical) or can be procured in time","Check for back orders or partial deliveries"]],
 ["5. Delivery and shipping details",["Confirm delivery dates align with the customer's requirements","Specify shipping conditions and mode of transport","Verify any special packaging or handling instructions"]],
 ["6. Order confirmation",["Review the entire sales order for accuracy before saving","Send order confirmation to the customer after booking"]],
 ["7. Follow-up",["Track the order for changes or cancellations","Coordinate with logistics for timely delivery"]]
]},
{ id:"A2", n:"Annexure 2 — Vendor quotation check", ic:"✅", kind:"check", s:"Verify the details of a quotation", groups:[
 ["Quotation review",["1. Item descriptions — all items listed with correct specifications","2. Pricing — quoted prices match expectations and budget","3. Quantities — align with requirements","4. Delivery terms — dates and conditions meet the timeline (prefer faster deal, better pricing, higher credit terms)","5. Payment terms — acceptable","6. Vendor credentials — reputation, certifications, reliability; especially before any major P.O. or advance payment","7. Expiry — quotation is valid; check expiration date","8. Compare with other quotes — competitive against alternative make & supply","9. Additional costs — hidden shipping or handling fees; price should be door delivery","10. Special conditions — review any special terms"]]
]}
];
