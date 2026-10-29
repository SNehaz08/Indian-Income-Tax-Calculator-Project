# Income Tax Calculation Tool

A lightweight Indian income-tax calculator written in C with a
terminal-style user interface (TUI). It supports calculations under the
New and Old Tax Regimes and can run in a browser through WebAssembly.

> **Disclaimer:** This is an educational project, not professional tax
> advice. Tax slabs, deductions, rebates, and cess rules may change.
> Verify the applicable financial year and official rules before relying
> on any result.

## Features

-   Terminal-style interface with keyboard navigation.
-   New and Old Indian tax regime options.
-   Progressive tax-slab calculations.
-   Standard deductions and selected deductions, as implemented in the
    program.
-   Section 87A rebate handling, as implemented in the program.
-   Health and Education Cess calculation.
-   C implementation compiled for browser use through WebAssembly.

## Architecture

1.  **Input and interaction** --- collects the user's choices and income
    details.
2.  **Calculation engine** --- performs tax calculations in C.
3.  **Output and presentation** --- displays the calculated result.

## Technologies

-   **C** --- application logic and calculations.
-   **Termbox2** --- terminal user interface.
-   **Emscripten / WebAssembly** --- browser execution.
-   **JavaScript and xterm.js** --- browser terminal integration.

## Limitations

-   The interface is terminal-based rather than a conventional graphical
    form.
-   Tax slabs and rules are maintained in source code and may require
    updates when tax regulations change.
-   Results depend on the assumptions and rules in the current version.
-   The browser version uses an externally loaded terminal library and
    requires an internet connection to load it.

## Accuracy Note

The calculator implements the tax assumptions encoded in the current
source. Check calculations against official guidance for the relevant
financial year before using results for financial decisions.
