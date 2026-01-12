import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/create',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/tasks/create-task/create-task.page')
            .then(m => m.CreateTaskPage),
      },
      {
        path: 'my-tasks',
        loadComponent: () =>
          import('./pages/tasks/my-tasks/my-tasks.page')
            .then(m => m.MyTasksPage),
      },
      {
        path: 'completed',
        loadComponent: () =>
          import('./pages/tasks/completed-tasks/completed-tasks.page')
            .then(m => m.CompletedTasksPage),
      },
    ],
  },
  
];