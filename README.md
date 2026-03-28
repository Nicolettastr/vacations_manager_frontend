# 🧑‍💼 TeamTracker

[🇪🇸 Español](#-español) | [🇬🇧 English](#-english)

---

# 🇪🇸 Español

## 🧑‍💼 TeamTracker

Aplicación web para la **gestión de empleados** en pequeñas empresas.

Permite administrar de forma sencilla:

- Vacaciones
- Horas extras
- Bajas (por distintos motivos)
- Notas internas
- Calendario de eventos laborales

Pensada para responsables de recursos humanos o gestores que necesiten una herramienta simple y centralizada.

---

## 🚀 Tecnologías

### 🖥️ Frontend
- Next.js
- React
- TanStack Query
- Zustand
- Tailwind CSS
- FullCalendar
- React Hook Form
- Zod
- i18next

---

### ⚙️ Backend
- Node.js
- Express
- Supabase (Base de datos + Auth)
- JWT
- bcrypt
- lowdb
- nanoid

---

## 🔐 Autenticación

- Supabase Auth  
- JWT  
- Persistencia de sesión  

---

## 📦 Instalación

### Clonar repositorio

```bash
git clone <repo-url>
cd nombre-del-proyecto
```

---

## 🖥️ Frontend

```bash
cd frontend
npm install
npm run dev
```

App disponible en:

```
http://localhost:9002
```

---

## ⚙️ Backend

```bash
cd backend
npm install
npm start
```

---

## 🔧 Variables de entorno

### Backend (.env)

```env
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
JWT_SECRET=your_secret
PORT=3000
```

---

### Frontend (.env)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

---

## 🧠 Funcionalidades

- Login de usuario  
- Gestión de empleados  
- Calendario interactivo  
- Gestión de vacaciones  
- Control de horas extras  
- Notas por empleado  
- Configuración de usuario  
- Soporte multi-idioma  

---

## 🏗️ Arquitectura

- Separación frontend/backend  
- Zustand para estado global  
- React Query para server state  
- Hooks personalizados  
- Componentes reutilizables  

---

## 📈 Estado del proyecto

- ✔ Funcionalidades principales implementadas  
- ✔ Sistema de autenticación  
- ✔ Gestión de empleados  
- ⚠️ Mejoras en curso  

---

## 🧪 Scripts

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

---

### Backend

```bash
npm start
```

---

## 🎯 Objetivo

Facilitar la gestión de empleados en pequeñas empresas mediante una herramienta simple y eficiente.

---

## 📄 Licencia

ISC

---

# 🇬🇧 English

## 🧑‍💼 TeamTracker

Web application for **employee management** in small businesses.

It allows you to easily manage:

- Vacations  
- Overtime hours  
- Sick leaves and absences  
- Internal notes  
- Work calendar  

Designed for HR managers or anyone handling employee administration.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- Next.js  
- React  
- TanStack Query  
- Zustand  
- Tailwind CSS  
- FullCalendar  
- React Hook Form  
- Zod  
- i18next  

---

### ⚙️ Backend
- Node.js  
- Express  
- Supabase (Database + Auth)  
- JWT  
- bcrypt  
- lowdb  
- nanoid  

---

## 🔐 Authentication

- Supabase Auth  
- JWT tokens  
- Session persistence  

---

## 📦 Installation

### Clone repository

```bash
git clone <repo-url>
cd project-name
```

---

## 🖥️ Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on:

```
http://localhost:9002
```

---

## ⚙️ Backend

```bash
cd backend
npm install
npm start
```

---

## 🔧 Environment variables

### Backend (.env)

```env
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
JWT_SECRET=your_secret
PORT=3000
```

---

### Frontend (.env)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

---

## 🧠 Features

- User authentication  
- Employee management  
- Interactive calendar  
- Vacation tracking  
- Overtime tracking  
- Employee notes  
- User settings  
- Multi-language support  

---

## 🏗️ Architecture

- Frontend / Backend separation  
- Global state with Zustand  
- Server state with React Query  
- Custom hooks  
- Reusable components  

---

## 📈 Project Status

- ✔ Core features implemented  
- ✔ Authentication system  
- ✔ Employee management  
- ⚠️ Ongoing improvements  

---

## 🧪 Scripts

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

---

### Backend

```bash
npm start
```

---

## 🎯 Goal

Provide a simple and efficient tool for managing employees in small businesses.

---

## 📄 License

ISC
