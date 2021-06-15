Using either Angular or React, create a Payments Portal containing the following modules

Login/Signup - As a Portal User I should use authentication/authorization to login to main Dashboard
Dashboard - As a Portal user I should be able to see charts over frequency of payments for last month/year/day
Payments - As a Portal user I should be able to see a list of all payments done in the past day/week/month.
                The page should use sockets to process realtime transactions
                Payments module should contain the following pages: 
                Payments List - A list of all payments with filters and sorting.
                Payment Details - When clicking an item, the item should send you to a details page.
                The payment details should have editable product items.
Payouts module/ Payouts Page - As a portal user I wish to be able to see a payout summary generated after each day. 
User Management Module / Page - As a portal user I wish to be able to see and edit all portal users.
                Users Page - should contain a list of all users.
                When clicking one of them, a pop-up should appear with contact details 
                (email, role, permissions editable)
                I should also be able to delete an user.

Implementation tips:
    Use Angular material for design/CSS or MaterialUI for React or Tailwind (either Angular or React)
    Use Angular CDK Portals or React Portals to implement custom Modals
    Use Angular NgRX or React Hooks/Context API for state management. pattern Redux
    Use lazy loading on all Angular / React pages.
    
    Angular + RxJS (Observables) + NgRx + Angular CDK