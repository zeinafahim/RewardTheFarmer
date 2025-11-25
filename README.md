# Reward A Farmer

**Course:** Electronic Business Development (BINF 503)  
**Semester:** Winter 2025  
**Instructor:** Dr. Nourhan Hamdi  
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa

---

## 1. Team Members

_List all team members (5-6 students) below._

| Name             | Student ID | Tutorial Group | GitHub Username |
| :--------------- | :--------- | :------------- | :-------------- |
| [Nadeen Elkhalifa] | [13004534]       | [T5]           | [@nadeenkhalifa]     |
| [Zeina Fahim] | [130077626]       | [T5]           | [@zeinafahim]     |
| [Hania Mohsen] | [1300]       | [T5]           | [@Hania-BI]     |
| [Malak Madyan] | [1300]       | [T5]           | [@malakmadyan2]     |
| [Gamila Anwar] | [1300]       | [T5]           | [@username]     |
| [Student 6 Name] | [ID]       | [T#]           | [@username]     |

---

## 2. Project Description

_Provide a detailed description of your project concept here. What is the app? What problem does it solve?_

- **Concept:** [Brief Summary]
- **Link to Fin-Tech Course Document:** [Insert Link if applicable]

---

## 3. Feature Breakdown

### 3.1 Full Scope

_List ALL potential features/user stories envisioned for the complete product (beyond just this course)._

- Feature A
- Feature B
- Feature C
- ...

### 3.2 Selected MVP Use Cases (Course Scope)

_From the list above, identify the **5 or 6 specific use cases** you will implement for this course. Note: User Authentication is mandatory._

1.  **User Authentication** (Registration/Login)
2.  [Use Case 2 Title]
3.  [Use Case 3 Title]
4.  [Use Case 4 Title]
5.  [Use Case 5 Title]
6.  [Use Case 6 Title - if 6 members]

---

## 4. Feature Assignments (Accountability)

_Assign one distinct use case from Section 3.2 to each team member. This member is responsible for the full-stack implementation of this feature._

| Team Member | Assigned Use Case       | Brief Description of Responsibility              |
| :---------- | :---------------------- | :----------------------------------------------- |
| [Student 1] | **User Authentication** | Register, Login, JWT handling, Password Hashing. |
| [Student 2] | [Use Case 2]            | [e.g., Create and view Transaction history]      |
| [Student 3] | [Use Case 3]            | [e.g., Profile management and updates]           |
| [Student 4] | [Use Case 4]            | [e.g., Transfer funds logic]                     |
| [Student 5] | [Use Case 5]            | [Description]                                    |
| [Student 6] | [Use Case 6]            | [Description]                                    |

---

## 5. Data Model (Initial Schemas)

_Define the initial Mongoose Schemas for your application’s main data models (User, Transaction, Account, etc.). You may use code blocks or pseudo-code._

### User Schema

```javascript
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields...
});
```

### [Model 2 Name] Schema

```javascript
// Define schema here
```

### [Model 3 Name] Schema

```javascript
// Define schema here
```
