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
| Nadeen Elkhalifa | 13004534      | T5          | @nadeenkhalifa     |
| Zeina Fahim | 13007626       | T5           | @zeinafahim     |
| Hania Mohsen | 13007287       | T5          | @Hania-BI     |
| Malak Madyan | 13006076       | T5           | @malakmadyan2     |
| Gamila Anwar | 13007300       | T5           | @gamilaanwar     |

---

## 2. Project Description

_Provide a detailed description of your project concept here. What is the app? What problem does it solve?_

- **Concept:** “Farmers struggle with accumulating agricultural waste that has little value and limited recycling access. Our solution is a digital platform that connects them directly to recycling facilities, turning their waste into income while giving them easy financial tools to support their farming needs. Our app allows farmers to easily authenticate their identity and request waste pickup and delivery. The integrated e-wallet enables farmers to receive incentives, manage their money directly within the app, and request microloans based on their transaction history. A clear transaction history feature helps users track payments, rewards, and all financial activities in one place.”
- **Link to Fin-Tech Course Document:** (https://www.canva.com/design/DAG42w8Iymc/Eua9EHPI2xOngmOR7N7AXg/edit)

---

## 3. Feature Breakdown

### 3.1 Full Scope

_List ALL potential features/user stories envisioned for the complete product (beyond just this course)._

- User Authentication
- Send Waste collection request
- Track waste collectors truck routes
- E-wallet (recieve incentives, withdraw, deposit capabilities)
- Transaction History
- Marketplace
- In App Educational Tutorials
- Micro Loan request



### 3.2 Selected MVP Use Cases (Course Scope)

_From the list above, identify the **5 or 6 specific use cases** you will implement for this course. Note: User Authentication is mandatory._

1.  **User Authentication** (Registration/Login)
2.  Send Waste collection request
3.  E-wallet
4.  Transaction History
5.  Micro Loan request


---

## 4. Feature Assignments (Accountability)

_Assign one distinct use case from Section 3.2 to each team member. This member is responsible for the full-stack implementation of this feature._

| Team Member | Assigned Use Case       | Brief Description of Responsibility              |
| :---------- | :---------------------- | :----------------------------------------------- |
| Zeina Fahim | **User Authentication** | Register, Login, JWT handling, Password Hashing. |
| Malak Madyan | **aste delivery request**            | [e.g., Create and view Transaction history]      |
| Hania Mohsen | **Micro Loan request**            | Submit and track microloan requests           |
| Nadeen Khalifa | **E-wallet**            | [e.g., Transfer funds logic]                     |
| Gamila Anwar | **Transaction History**            | [Description]                                    |
|                                    |

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

### [Micro Loan request] Schema

```javascript
const MicroloanRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },          // user's full name
  nationalId: { type: String, required: true },    // unique national ID
  mobile: { type: String, required: true },        // for contact
  amount: { type: Number, required: true },        // loan amount requested
  purpose: { type: String, required: true },       // reason for loan
  state: { 
    type: String, 
    enum: ['Submitted', 'Reviewed', 'Scored'], 
    default: 'Submitted' 
  },                                                // track progress of request
  createdAt: { type: Date, default: Date.now },    // auto-set creation time
});
```

### [Model 3 Name] Schema

```javascript
// Define schema here
```
