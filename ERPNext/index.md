# ERPNext Implementation Blueprint

Dated: Sept. 21, 2025

Company: Rai and Rai Electronics  
Industry: Consumer Electronics Manufacturing

Scope (Phase 1): Sales, Purchase, Inventory, HR & Payroll

Deferred: Manufacturing, Projects, CRM, India-compliance (future phases)

System Versions

* Bench: v5 (latest stable release): v5.25  
* Frappe Framework: v15 (latest stable release): v15.82  
* ERPNext: v15 (latest stable release): v15.79  
* Frappe HR: v15 (latest stable release): v15.50  
* Additional App: [India-compliance](https://github.com/resilient-tech/india-compliance) v15.22; for GST, e-Invoicing, and e-Way Bill compliance \[Skipped due to scope of the assignment, but recommended strongly\]

Company Locations

* Manufacturing Unit: Pune, Maharashtra (Western India)  
* Warehouse 1 (North India): Delhi  
* Warehouse 2 (South India): Bengaluru, Karnataka

### 1\. Department-Wise Requirement Summary

## Sales:

| Core Requirements | ERPNext Capability / Module | Assumptions |
| :---- | :---- | :---- |
| Manage orders: Quotations (optional), Sales Order, Delivery Note, Invoice | Selling and Accounts modules | Quotation is optional; standard sale cycle is used. |
| Multi-warehouse sales allocation | Stock module (Warehouse allocation in Sales Order and Delivery Note) | Items can be fulfilled from any warehouse (Pune, Bengaluru or Delhi). |
| Customer credit checks | Selling module (Customer Credit Limit feature) | Credit limit defined in Customer Master; system blocks or warns if limit exceeded. |
| Pricing management | Selling module (Price List and Pricing Rule) | Price lists created for Dealers/Distributors; discounts handled using Pricing Rules. |
| Salesperson tracking | Selling module (Sales Person field in transactions) | Each transaction tagged to a salesperson. |
| Basic commission logic | Selling module (Sales Partner and Commission) | Commission is percentage-based on the invoiced amount. |
| GST compliance for invoicing | Accounts module | GST setup in Company and Item Tax Templates. |
| Warranty & returns | Selling and Stock modules (Sales Return, Delivery Note Return, Warranty Claim) | Serial number tracking enabled; warranty terms in Item Master. |
| Reports | Native reports in Selling and Accounts modules | Sales Analytics, Item-wise Sales, Outstanding Invoices used as-is. |

## Inventory

| Core Requirements | ERPNext Capability / Module | Assumptions |
| :---- | :---- | :---- |
| Multi-warehouse management | Stock module (Warehouse master) | Three warehouses: Pune (manufacturing), Bengaluru, Delhi. Warehouses can store any item. |
| Stock tracking (real-time) | Stock Ledger, Serial Number / Batch tracking | Serial number / Batch tracking enabled for finished goods (warranty). |
| Stock replenishment planning | Reorder Levels in Item Master | Simple min-max based reordering used. |
| Inter-warehouse transfers | Stock Entry (Material Transfer) | Used mainly for balancing stock across warehouses; no production staging assumed. |
| Inventory valuation | Stock module (FIFO, Moving Average valuation methods) | Moving Average assumed as default; valuation applied per item across warehouses. |
| Periodic stock audits | Stock Reconciliation (Stock Entry type) | Physical verification done quarterly; adjustments logged in ERPNext. |
| Damaged / scrap stock logging | Stock Entry (Material Issue with custom Purpose: Damaged) | Damaged items logged separately; scrap disposal handled via stock issue. |
| Integration with sales & purchase | Native integration between Selling, Buying, and Stock modules | Stock auto-updated from Purchase Receipts and Delivery Notes; no duplicate data entry. |
| Reports | Native Inventory reports | Stock Ledger, Stock Balance, Stock Ageing, Item-wise Sales/Purchase available; no customisation needed. |

## HR & Payroll

| Core Requirements | ERPNext Capability / Module | Assumptions |
| :---- | :---- | :---- |
| Employee records management | HR module (Employee master) | All employees created with personal, job, and statutory details. |
| Attendance tracking | HR module (Attendance) with Biometric API integration | Biometric device integrated via API; fallback manual attendance entry allowed. |
| Leave management | HR module (Leave Application, Leave Allocation) | Standard leave types: CL, SL, EL; accrual and carry-forward as per company policy; approvals handled via workflow. |
| Payroll processing | Payroll module (Salary Structure, Salary Slip, Payroll Entry) | Monthly payroll cycle; allowances and deductions configured; bulk salary disbursement supported. |
| Statutory compliance | Payroll | PF, ESI, PT, and TDS compliance enabled for Indian payroll; state-specific PT applies. |
| Payslip generation and bulk disbursement | Payroll module (Salary Slip, Bank Advice Report) | Employees receive payslips via email/ERP portal; bulk bank transfer file generated for disbursement. |
| Appraisal and performance record | HR module (Appraisal, Employee History) | Appraisal records maintained annually; basic performance documentation. |
| Reports | Native HR & Payroll reports | Standard reports: Employee Information, Attendance, Leave Ledger, Salary Register, Compliance Reports. |

## 2\. Implementation Plan & Sprint Structure

### Major Milestones

1. **Discovery & Requirements Validation**  
     
   * Kick-off workshops, finalise scope, process mapping, data collection.

   

2. **ERPNext Core Setup**  
     
   * Install ERPNext, configure company settings, enable core modules.  
   * Install Frappe HR, do settings like holiday list, working hours, set up email notifications, salary structure and other required settings / configuration.

   

3. **Departmental Pilots & UAT**  
     
   * Configure and process-test for Sales, Inventory, HR/Payroll.  
   * Conduct UAT (User Acceptance Testing) with key users for feedback before migration.

   

4. **Data Migration & Integration**  
     
   * Import opening balances, HR master data, item masters, stock, customers, suppliers.  
   * Validate migrated data with department stakeholders.

   

5. **Go-Live & Hypercare**  
     
   * Move to production environment.  
   * Provide intensive user support for \~4 weeks.  
   * Transition smoothly to BAU (Business-as-Usual) operations.

### Key ERPNext Modules

* Sales: Selling, Accounts (invoicing & collections), CRM.  
* Inventory: Stock, Purchase, Item, Warehouse, Quality.  
* HR & Payroll: Human Resources, Payroll, Attendance, Compliance (TDS, PF, ESI, PT).  
* Statutory GST Compliance: Tax and charges templates, Item tax template, HSN/SAC codes, GST sale / purchase register (Accounts module)*.*

### Sample 2-Week Sprint Cycle

Sprint 1 (14-Day Example):

* Day 1: Sprint planning & backlog grooming.  
* Day 2–3: Discovery workshops and data collection.  
* Day 4–9: Core configuration & setup (e.g., Item master, Employees, Permissions).  
* Day 10: Mini-UAT / feedback session for configured features.  
* Day 11-12: Bug-fixes & refinements.  
* Day 13: Sprint review / demo with stakeholders.  
* Day 14: Retrospective & document learnings.

### Sync Checkpoints

* Daily Standup: 15 mins for status & blockers.  
* Weekly Checkpoint: Milestone review & discussion of upcoming sprint.  
* Ad hoc: Critical issue reviews as needed.

## 3\. Technical Workflows

### Purchase Order Approval Workflow

**Workflow Logic:**

* Draft (created by Purchase User).  
* Submit for Approval (forwarded to Purchase Manager).  
* \[Automated Check\] If amount \> ₹100,000 \-\> Requires Director Approval.  
* Approval (Purchase Manager/Director).  
* Final State: Approved Purchase Order (can be printed/emailed to Supplier).

**Pseudocode:**

if PO.amount \<= 100000:

    Approver \= Purchase Manager

else:

    Approver \= Director

**States:**

* Draft \-\> Pending Approval \-\> Approved/Rejected

**Transitions:**

* Draft \-\> (Submit) \-\> Pending Approval  
* Pending Approval \-\> (Approve) \-\> Approved  
* Pending Approval \-\> (Reject/Return) \-\> Draft

**ERPNext Implementation:**

* Use Workflow engine on Purchase Order DocType.  
* Configure states, colours, and role permissions.  
* Enable email notifications to approvers.  
* Once *Approved & Submitted*, PO is actionable (can be sent to Supplier).

---

### Leave Application Approval Workflow

**Workflow Logic:**

* Employee raises Leave Application.  
* Reporting Manager receives notification.  
* Manager reviews — can Approve or Reject.  
* HR receives final record for payroll impact.

**States:**

* Applied \-\> Under Review \-\> Approved/Rejected

**Transitions:**

* Employee (Apply \-\> Under Review).  
* Manager (Approve \-\> Approved \-\> HR notified).  
* Manager (Reject \-\> Rejected \-\> Application closed).

**ERPNext Implementation:**

* Workflow configured on Leave Application DocType.  
* Stages with email triggers for both Manager and HR.  
* Approved leave automatically reflected in attendance and payroll cycle.

## 4\. Dashboard & KPI Design

### Sales Head Dashboard

| KPI / Report | Native in ERPNext | Customisation Needed |
| :---- | :---- | :---- |
| Monthly Revenue (Sales Invoice) | Yes | No |
| Open Quotations & Orders | Yes | No |
| Sales Conversion % | Partially | Simple script/formula |
| Top-selling Products | Yes | No |
| Warehouse-wise Sales Split | Yes | No |
| Receivables Ageing | Yes | No |

### HR Manager Dashboard

| KPI / Report | Native in ERPNext | Customisation Needed |
| :---- | :---- | :---- |
| Total Headcount | Yes | No |
| New Joinees / Attrition Status | Yes | No |
| Monthly Leave Statistics | Yes | No |
| Salary Processing Status | Yes | No |
| Attendance Patterns | Yes | No |
| PF / ESI Compliance | Yes | No |

### Dashboard Layout Samples (Mockup)

![][image1]

* **Sales Head**:  
    
  * Sales Trend Graph (Invoices over time).  
  * Sales Funnel (Enquiry \-\> Quotation \-\> Order \-\> Invoice).  
  * Top 5 Selling Items (by quantity or value).  
  * Open Orders List.  
  * Receivables Ageing Chart.


* **HR Manager**:

  * Active Headcount Card.  
  * Recent Leave Applications (with approval status).  
  * Payroll Processing Progress Bar.  
  * Attendance Pattern Pie (Present/Absent/Late).  
  * Compliance Alerts (PF/ESI filing reminders).

![][image2]

All dashboards and reports can be built natively using ERPNext’s Report Builder and Dashboard features. Only Sales Conversion % requires a simple calculation (e.g., Orders ÷ Quotations). No heavy customisation required.  


[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>
