import MainLayout from 'layouts/MainLayout.vue'
import IndexPage from 'pages/IndexPage.vue'
import LoginPage from 'pages/LoginPage.vue'
import RegisterPage from 'pages/RegisterPage.vue'
import CalendarPage from 'pages/CalendarPage.vue'

import ExpensesPage from 'pages/ExpensesPage.vue'
import CreateExpensePage from 'pages/CreateExpensePage.vue'
import OneExpense from 'pages/OneExpense.vue'
import { Notify } from 'quasar'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: IndexPage,
     },
      { path: '/login', component: LoginPage },
      { path: '/register', component: RegisterPage},
      { path: '/expenses', component: ExpensesPage,
      beforeEnter: (to, from) => {
        if(localStorage.getItem("authToken") === null){
          Notify.create({
            message: 'You need to login first',
            textColor: "white-5",
            type: "info",
          })
          
          return {path: '/login'}
        }

        return true
      },},
      { path: '/calendar', component: CalendarPage},
      { path: '/create-expense', component: CreateExpensePage},
      { path: '/expenses/:id', component: OneExpense},

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
