# 🎭 Playwright Enterprise Automation Framework (SauceDemo E-Commerce)

An End-to-End (E-E) Automation Testing Framework designed and built for the **SauceDemo E-Commerce** application using **Playwright**, **TypeScript**, and modern Test Automation Design Patterns.

---

## 🎯 Project Overview

This framework demonstrates industry-standard automation testing practices, focusing on maintainability, scalability, and execution speed. It covers critical user journeys such as Authentication, Product Selection, Shopping Cart calculations, Checkout workflows, and API/UI hybrid interactions.

---

## 🛠️ Tech Stack & Architecture

* **Automation Tool:** [Playwright](https://playwright.dev/)
* **Programming Language:** [TypeScript](https://www.typescriptlang.org/)
* **Design Pattern:** Page Object Model (POM) with a centralized `BasePage`
* **Test Runner:** Playwright Test Runner
* **CI/CD Integration:** GitHub Actions
* **Reporting:** Playwright HTML Reporter, Screenshots, Videos & Trace Viewer (on failure)

---

## 🏗️ Project Structure

```text
playwright-saucedemo-e2e/
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI/CD Pipeline Configuration
├── src/
│   ├── page-objects/             # Page Object Model classes
│   │   ├── base.page.ts          # Core Base Page with reusable utility methods
│   │   ├── login.page.ts         # Login Page Objects & Interactions
│   │   └── inventory.page.ts     # Products / Inventory Page Objects
│   ├── data/                     # Dynamic Test Data (JSONs)
│   │   └── users.json
│   └── utils/                    # Helper utilities & API helpers
├── tests/                        # Test Specification Files
│   ├── login.spec.ts
│   └── e2e-shopping.spec.ts
├── .gitignore
├── package.json
├── playwright.config.ts          # Global Playwright Configuration
└── README.md                     # Project Documentation
```

## 🏷️ Naming Conventions & Coding Standards

To maintain a clean and professional codebase, this repository follows strict naming rules:

### 1. File & Directory Names
* **Directories:** `kebab-case` (e.g., `page-objects`, `test-data`)
* **Page Object Files:** `kebab-case` with `.page.ts` suffix (e.g., `base.page.ts`, `login.page.ts`)
* **Test Spec Files:** `kebab-case` with `.spec.ts` suffix (e.g., `login.spec.ts`, `e2e-shopping.spec.ts`)
* **Test Data Files:** `kebab-case` with `.json` extension (e.g., `users.json`)

### 2. Code Level Conventions
* **Classes (Page Objects):** `PascalCase` (e.g., `BasePage`, `LoginPage`)
* **Methods (Actions):** `camelCase` starting with Verb + Noun (e.g., `navigateTo()`, `clickLoginButton()`, `verifyErrorMessage()`)
* **Variables & Locators:** `camelCase` with Noun + Element Type (e.g., `usernameInput`, `loginButton`, `errorMessage`)
* **Constants:** `UPPER_SNAKE_CASE` (e.g., `BASE_URL`, `DEFAULT_TIMEOUT`)

### 3. Test Cases Naming
* **`test.describe` (Test Suite):** UPPERCASE Module/Feature Name (e.g., `AUTHENTICATION FLOW`)
* **`test()` (Test Case):** Test ID + Clear Business Intent (e.g., `TC01: Verify error message when logging in with locked user`)

---
