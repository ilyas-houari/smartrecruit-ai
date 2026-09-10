import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';


export const routes: Routes = [

  // ================================
  // DEFAULT
  // ================================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  // ================================
  // AUTH
  // ================================

  {
    path: 'login',

    loadComponent: () =>
      import(
        './features/auth/pages/login/login'
      )
      .then(
        m => m.Login
      )

  },


  {
    path: 'register',

    loadComponent: () =>
      import(
        './features/auth/pages/register/register'
      )
      .then(
        m => m.Register
      )

  },


  // ================================
  // RECRUITER
  // ================================

  {
    path: 'recruiter',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['RECRUITER']
    },

    loadComponent: () =>
      import(
        './shared/layouts/app-layout/app-layout'
      )
      .then(
        m => m.AppLayout
      ),


    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },


      {
        path: 'dashboard',

        loadComponent: () =>
          import(
            './features/recruiter/pages/dashboard/dashboard'
          )
          .then(
            m => m.Dashboard
          )

      },


      // JOBS

      {
        path: 'jobs/create',

        loadComponent: () =>
          import(
            './features/recruiter/pages/create-job/create-job'
          )
          .then(
            m => m.CreateJob
          )

      },


      {
        path: 'jobs/:id/edit',

        loadComponent: () =>
          import(
            './features/recruiter/pages/edit-job/edit-job'
          )
          .then(
            m => m.EditJob
          )

      },


      {
        path: 'jobs/:id',

        loadComponent: () =>
          import(
            './features/recruiter/pages/job-details/job-details'
          )
          .then(
            m => m.JobDetails
          )

      },


      {
        path: 'jobs',

        loadComponent: () =>
          import(
            './features/recruiter/pages/my-jobs/my-jobs'
          )
          .then(
            m => m.MyJobs
          )

      },


      // APPLICATIONS

      {
        path: 'applications/:id',

        loadComponent: () =>
          import(
            './features/recruiter/pages/application-details/application-details'
          )
          .then(
            m => m.ApplicationDetails
          )

      },


      {
        path: 'applications',

        loadComponent: () =>
          import(
            './features/recruiter/pages/applications/applications'
          )
          .then(
            m => m.Applications
          )

      },


      // CANDIDATES

      {
        path: 'candidates/:id',

        loadComponent: () =>
          import(
            './features/recruiter/pages/candidate-profile/candidate-profile'
          )
          .then(
            m => m.CandidateProfile
          )

      },


      {
        path: 'candidates',

        loadComponent: () =>
          import(
            './features/recruiter/pages/candidates/candidates'
          )
          .then(
            m => m.Candidates
          )

      },


      // AI RANKING

      {
        path: 'ranking',

        loadComponent: () =>
          import(
            './features/recruiter/pages/ranking/ranking'
          )
          .then(
            m => m.Ranking
          )

      },


      {
        path: '**',

        redirectTo: 'dashboard'

      }

    ]

  },



  // ================================
  // CANDIDATE
  // ================================

  {
    path: 'candidate',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['CANDIDATE']
    },

    loadComponent: () =>
      import(
        './shared/layouts/app-layout/app-layout'
      )
      .then(
        m => m.AppLayout
      ),


    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },


      {
        path:'dashboard',

        loadComponent:()=> 
          import(
            './features/candidate/pages/dashboard/dashboard'
          )
          .then(
            m=>m.Dashboard
          )

      },


      {
        path:'profile',

        loadComponent:()=> 
          import(
            './features/candidate/pages/profile/profile'
          )
          .then(
            m=>m.Profile
          )

      },


      {
        path:'cv',

        loadComponent:()=> 
          import(
            './features/candidate/pages/cv/cv'
          )
          .then(
            m=>m.Cv
          )

      },


      {
        path:'jobs/:id',

        loadComponent:()=> 
          import(
            './features/candidate/pages/job-details/job-details'
          )
          .then(
            m=>m.JobDetails
          )

      },


      {
        path:'jobs',

        loadComponent:()=> 
          import(
            './features/candidate/pages/jobs/jobs'
          )
          .then(
            m=>m.Jobs
          )

      },


      {
        path:'applications',

        loadComponent:()=> 
          import(
            './features/candidate/pages/applications/applications'
          )
          .then(
            m=>m.Applications
          )

      },


      {
        path:'recommendations',

        loadComponent:()=> 
          import(
            './features/candidate/pages/recommendations/recommendations'
          )
          .then(
            m=>m.Recommendations
          )

      }

    ]

  },


// ================================
// ADMIN
// ================================

{
  path: 'admin',

  canActivate: [
    authGuard,
    roleGuard
  ],

  data: {
    roles: ['ADMIN']
  },

  loadComponent:()=>
    import(
      './shared/layouts/app-layout/app-layout'
    )
    .then(
      m=>m.AppLayout
    ),


  children:[


    {
      path:'',

      redirectTo:'dashboard',

      pathMatch:'full'

    },



    {
      path:'dashboard',

      loadComponent:()=> 
        import(
          './features/admin/pages/dashboard/dashboard'
        )
        .then(
          m=>m.Dashboard
        )

    },



    {
      path:'users',

      loadComponent:()=> 
        import(
          './features/admin/pages/users/users'
        )
        .then(
          m=>m.Users
        )

    },



    {
      path:'companies',

      loadComponent:()=> 
        import(
          './features/admin/pages/companies/companies'
        )
        .then(
          m=>m.Companies
        )

    },



    {
      path:'jobs',

      loadComponent:()=> 
        import(
          './features/admin/pages/jobs/jobs'
        )
        .then(
          m=>m.Jobs
        )

    },



    {
      path:'trainings',

      loadComponent:()=> 
        import(
          './features/admin/pages/trainings/trainings'
        )
        .then(
          m=>m.Trainings
        )

    }



  ]

},


  // ================================
  // NOT FOUND
  // ================================

  {
    path:'**',

    redirectTo:'login'

  }

];