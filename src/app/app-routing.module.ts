import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './back/all-template-back/all-template-back.component';
import { HomeFrontComponent } from './front/home-front/home-front.component';
import { HomeBackComponent } from './back/home-back/home-back.component';
import { DepartmentComponent } from './departments/department/department.component';
import { EmpContractComponent } from './emp-contracts/emp-contract/emp-contract.component';
import { DepartaddComponent } from './departments/departadd/departadd.component';
import { DepartdetailComponent } from './departments/departdetail/departdetail.component';
import { DepartupdateComponent } from './departments/departupdate/departupdate.component';
import { EmpcontaddComponent } from './emp-contracts/empcontadd/empcontadd.component';
import { EmpcontdetailComponent } from './emp-contracts/empcontdetail/empcontdetail.component';
import { EmpcontupdateComponent } from './emp-contracts/empcontupdate/empcontupdate.component';
import { LeaveaddComponent } from './leaves/leaveadd/leaveadd.component';
import { LeaveComponent } from './leaves/leave/leave.component';
import { LeavebyuserComponent } from './leaves/leavebyuser/leavebyuser.component';
import { LeaveupdateComponent } from './leaves/leaveupdate/leaveupdate.component';
import { LeavedetailComponent } from './leaves/leavedetail/leavedetail.component';
import { PerformanceChartComponent } from './performances/performance-chart/performance-chart.component';
import { JobOfferComponent } from './back/job-offer/job-offer.component';
import { JobOfferUpdateComponent } from './back/job-offer-update/job-offer-update.component';
import { JobApplicationComponent } from './front/job-application/job-application.component';
import { AddJobApplicationComponent } from './front/add-job-application/add-job-application.component';
import { InterviewComponent } from './back/interview/interview.component';
import { AddInterviewComponent } from './back/add-interview/add-interview.component';
import { InterviewUpdateComponent } from './back/interview-update/interview-update.component';
import { JitsiMeetComponent } from './jitsi-meet/jitsi-meet.component';
import { StatComponent } from './back/stat/stat.component';
import { ProjectUpdateComponent } from './back/project-update/project-update.component';
import { ProjectCalendarComponent } from './back/project-calendar/project-calendar.component';
import { ProjectStatComponent } from './back/project-stat/project-stat.component';
import { ProjectComponent } from './back/project/project.component';
import {ContratsComponent} from "./front/contrats/contrats.component";
import {AddContratComponent} from "./front/add-contrat/add-contrat.component";
import {ContratDetailComponent} from "./front/contrat-detail/contrat-detail.component";
import {UpdateContratComponent} from "./front/update-contrat/update-contrat.component";
import {InvoicesComponent} from "./back/invoices/invoices.component";
import {ContratComponent} from "./back/contrat/contrat.component";
import {ContratDetailsComponent} from "./back/contrat-details/contrat-details.component";
import {AddInvoicesComponent} from "./back/add-invoices/add-invoices.component";
import {UpdateContratBackComponent} from "./back/update-contrat-back/update-contrat-back.component";
import {InvoicesDetailsComponent} from "./front/invoices-details/invoices-details.component";
import {InvoicesDetailComponent} from "./back/invoices-detail/invoices-detail.component";
import {ShowInvoicesComponent} from "./front/show-invoices/show-invoices.component";
import {StatistiqueComponent} from "./front/statistique/statistique.component";
import {ArchiveContratComponent} from "./front/archive-contrat/archive-contrat.component";
import {AddTasksComponent} from "./back/add-tasks/add-tasks.component";
import {TasksComponent} from "./back/tasks/tasks.component";
import {UpdateTasksBackComponent} from "./back/update-tasks-back/update-tasks-back.component";
import {StatistiqueTasksComponent} from "./back/statistique-tasks/statistique-tasks.component";
import { PerformanceuserComponent } from './performances/performanceuser/performanceuser.component';
import { UserchartComponent } from './performances/userchart/userchart.component';
import { ChatProjectComponent } from './back/chat-project/chat-project.component';
import { ListActivityManagementComponent } from './_ActivityManagement/list-activity-management/list-activity-management.component';
import { AddActivityManagementComponent } from './_ActivityManagement/add-activity-management/add-activity-management.component';
import { UpdateActivityManagementComponent } from './_ActivityManagement/update-activity-management/update-activity-management.component';
import { DatePipe } from '@angular/common';
import { DetailActivityManagementComponent } from './_ActivityManagement/detail-activity-management/detail-activity-management.component';
import { ListReportComponent } from './_addingReports/list-report/list-report.component';
import { AddReportComponent } from './_addingReports/add-report/add-report.component';
import { DetailReportComponent } from './_addingReports/detail-report/detail-report.component';
import { UpdateReportComponent } from './_addingReports/update-report/update-report.component';
import { ListMeetingsComponent } from './meetings/list-meetings/list-meetings.component';
import { AddMeetingsComponent } from './meetings/add-meetings/add-meetings.component';
import { UpdateMeetingsComponent } from './meetings/update-meetings/update-meetings.component';
import { ListTrainingComponent } from './training/list-training/list-training.component';
import { UpdateTrainingComponent } from './training/update-training/update-training.component';
import { AddTrainingComponent } from './training/add-training/add-training.component';
import { FeedbackaddComponent } from './feedbackadd/feedbackadd.component';
import { ListFeedbacksComponent } from './list-feedbacks/list-feedbacks.component';
import { ListConsultantComponent } from './list-consultant/list-consultant.component';
import { AddConsultantComponent } from './add-consultant/add-consultant.component';
import { DetailsConsultantComponent } from './details-consultant/details-consultant.component';
import { StoreComponent } from './knowledgeStore/store/store.component';
import { MailVerifComponent } from './mail-verif/mail-verif.component';
import { ListeParticipantsComponent } from './training/liste-participants/liste-participants.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TaskTrackerComponent } from './training/task-tracker/task-tracker.component';
import { TaskProgressComponent } from './training/task-progress/task-progress.component';


import { UserComponent } from './back/user/user.component';
import { AddUserComponent } from './back/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { UpdateUserComponent } from './back/update-user/update-user.component';
import { ProfileComponent } from './back/profile/profile.component';
import { ViewProfileComponent } from './back/view-profile/view-profile.component';
import { AccessDeniedComponent } from './front/access-denied/access-denied.component';
import { RoleStatComponent } from './back/role-stat/role-stat.component';
import { AuthInterceptor } from './_services/auth/auth.interceptor';
import { BotChatComponent } from './front/bot-chat/bot-chat.component';
import Chart from 'chart.js/auto';
import { GraphComponent } from './back/graph/graph.component';
import { ProfileFrontComponent } from './front/profile-front/profile-front.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MainComponent } from './pages/main/main.component';
import { UComponent } from './pages/u/u.component';

import { AuthGuard } from './_services/auth/auth.guard';
import { GeminiComponent } from './front/gemini/gemini.component';
import { TaskProgressFrontComponent } from './_ActivityManagement/task-progress1/task-progress.component';
import { TasksTeamComponent } from './back/tasks-team/tasks-team.component';
import { UpdateTasksTeamsComponent } from './back/update-tasks-teams/update-tasks-teams.component';

import { ReclamationAdminComponent } from './back/reclamation-admin/reclamation-admin.component';
import { ReclamationDialogComponent } from './back/reclamation-dialog/reclamation-dialog.component';
import { ReclamationComponent } from './back/reclamation/reclamation.component';

const routes: Routes = [ 
   //default route
   {path:'', redirectTo :'/front', pathMatch:'full'},

  {path:'meet', component:JitsiMeetComponent},
  { path : "",
  component:AllTemplateFrontComponent,
  children:[
    {
      path:"",
      component:HomeFrontComponent
    },
    {
      path:"",
      component:JobApplicationComponent
    },
    {
      path:'AddjobApplication/:id',
      component:AddJobApplicationComponent
    }]},
{ 
  path : "front",
  component:AllTemplateFrontComponent,
  children:[

    {path:"", component:HomeFrontComponent },
    { path:"register", component:RegisterComponent,},
    {path:"login", component:LoginComponent,},
     //{path: "chat",component:BotChatComponent},
    {path: "profile", component:ProfileFrontComponent},
    {path: "gemini", component:GeminiComponent},

    {
      path:"",
      component:HomeFrontComponent
    },
    { path: 'invoices-detail/:idContrat',
      component: InvoicesDetailsComponent
    },
    {
      path:"contrat",
      component:ContratsComponent
    },
    {
      path:"archive",
      component:ArchiveContratComponent
    },
    
    {
      path:"addContrat",
      component:AddContratComponent
    },
    {path:'contrat/:id',
      component:ContratDetailComponent
    },
    { path: 'update-contrat/:id',
      component: UpdateContratComponent
    },
    {
      path:'AddjobApplication/:id',
      component:AddJobApplicationComponent
    },

    { path: 'show-invoices/:id', component: ShowInvoicesComponent },
    { path: 'statistique', component: StatistiqueComponent },
  ]
},
{
  path:"back",
  component:AllTemplateBackComponent,
  canActivate: [AuthGuard], // Appliquer l'AuthGuard ici

  children:[
    { path: "", component: HomeBackComponent },
    { path: "user", component: UserComponent },
    { path: "reclamation", component:ReclamationComponent  },


    { path: "adminReclamation", component:ReclamationAdminComponent  },
    { path: "reclamationDialog", component:ReclamationDialogComponent  },


    { path: "addUser", component: AddUserComponent },
    { path: "updateUser/:id", component: UpdateUserComponent },
    {path: "profile", component: ProfileComponent},
    { path: "viewUser/:id", component :ViewProfileComponent},
    {path:'role-stats',component:RoleStatComponent},
    {path: 'graph', component: GraphComponent},
    {path: "taskprogress", component:TaskProgressFrontComponent},

    { path: 'leaves/user/:userId', 
     component: LeavebyuserComponent },
    {
      path:"",
      component:HomeBackComponent
    },
    {
      path:"leaves",
      component:LeaveComponent
    },
    {
      path:"leaveadd",
      component:LeaveaddComponent
    },
    {
      path:"jobOffers",
      component:JobOfferComponent
    },
    {
      path:"chat",
      component:ChatProjectComponent
    },
    {
      path:"invoices",
      component:InvoicesComponent
    },
    {
      path: 'addInvoices/:idContrat', // Ajoutez le paramètre idContrat à la route
      component: AddInvoicesComponent
    },
    {
      path: 'invoices/:id', // Définissez le chemin correspondant à votre URL
      component: InvoicesComponent // Composant à charger lorsque cette route est activée
    },
    {
      path:"addInvoices",
      component:AddInvoicesComponent
    },
    { path: 'tasksteams', component: TasksTeamComponent },
    { path: 'update-task-team/:id', component: UpdateTasksTeamsComponent },
    {
      path:"contrat",
      component:ContratComponent
    },
    {path:'contrat/:id',
      component:ContratDetailsComponent
    },
    { path: 'update-contrat-back/:id',
      component: UpdateContratBackComponent
    },
    { path: 'invoices-detail/:id', component: InvoicesDetailComponent },
    {
      path: 'add-tasks',
      component: AddTasksComponent
    },
    { path: 'update-task/:id', component: UpdateTasksBackComponent },
    { path: 'statistiques', component: StatistiqueTasksComponent },
    {
      path: 'tasks',
      component: TasksComponent
    },
    {
      path:"projects",
      component:ProjectComponent
    },
    {
      path:"projectsCalender",
      component:ProjectCalendarComponent
    },
    {
      path:"projectsStat",
      component:ProjectStatComponent
    },
    {
      path:"updateProject/:id",
      component:ProjectUpdateComponent
    },
    {
      path:'jobOffers/update/:id',
      component:JobOfferUpdateComponent
    },
    {
      path:'jobApplications/:id',
      component:JobApplicationComponent
    },
    {
      path:'addInterview/:id',
      component:AddInterviewComponent
    },
    {
      path:'interviewUpdate/:id',
      component:InterviewUpdateComponent
    },
    {
      path:'interview/:id',
      component:InterviewComponent
    },
    {
      path:"stat",
      component:StatComponent
    },
    {
      path:"leavedetail/:leaveId",
      component:LeavedetailComponent
    },
    {
      path: 'leaves/leaveupdate/:leaveId',
      component: LeaveupdateComponent
    },
    {
      path:"performances",
      component:PerformanceChartComponent
    },  
    {
      path:"performances/performanceuser",
      component:PerformanceuserComponent
    },  
    {
      path:"performances/userchart",
      component:UserchartComponent
    },
    {
      path:"departments",
      component:DepartmentComponent
    },

    {
      path:"departadd",
      component:DepartaddComponent
    },
      {path:'departments/:id',
      component:DepartdetailComponent

    },
    {path:'departments/updateDepartment/:id',
      component:DepartupdateComponent

    },
    {
      path:"empContracts",
      component:EmpContractComponent
    },
    {
      path:"empContadd",
      component:EmpcontaddComponent
    },
    {
        path:'empContracts/:id',
      component:EmpcontdetailComponent

    },
    {
      path:'empContracts/updateEmpContract/:id',
      component:EmpcontupdateComponent

    },
    
   //activities
   {path:"getAll", component:ListActivityManagementComponent},
   {path:"update/:id", component:UpdateActivityManagementComponent},
   {path:"addTask", component:AddActivityManagementComponent},
   { path: 'getById/:id', component: DetailActivityManagementComponent },
   // *********************************************************
   // *********************************************************
   // *********************************************************
   // *********************************************************
   //reports
   { path: 'getAllReports', component: ListReportComponent },
   {path:"addReport", component:AddReportComponent},
   {path:"getReportById/:id", component:DetailReportComponent},
   {path:"updateReport/:id", component:UpdateReportComponent},
// *********************************************************
// *********************************************************
// *********************************************************
// *********************************************************
   //meetings
   {path:"getallMeetings", component:ListMeetingsComponent},
   {path:"addMeeting", component:AddMeetingsComponent},
   {path:"updateMeeting/:id", component:UpdateMeetingsComponent},
// *********************************************************
// *********************************************************
// *********************************************************
// *********************************************************
   //trainings
   {path:"getAllTrainings", component:ListTrainingComponent},
   {path:"updateTraining/:id", component:UpdateTrainingComponent},
   {path:"addTraining", component:AddTrainingComponent},
   //feedbacks
   { path: 'addFeedback/:id/:consultantName', component: FeedbackaddComponent },
   { path: 'addFeedback/:id', component: FeedbackaddComponent },
   {path:"allFeedbacks", component:ListFeedbacksComponent},

//consultants
{path:"getAllConsultants", component:ListConsultantComponent},
{path:"addConsultant", component:AddConsultantComponent},
{path:"getConsultById/:id", component:DetailsConsultantComponent},

//project
{path:"project", component:ProjectComponent},
//store
{path:"store", component:StoreComponent},
//mailing

{path:"mailingPage/:id", component:MailVerifComponent},
//statistics dashbord
{path:"liste-participants", component:ListeParticipantsComponent},
{ path: "statistics", component: StatisticsComponent },
//taskTracking
{path:"Tracking", component:TaskTrackerComponent},
//taskProgress
{path:"progress", component:TaskProgressComponent},

{ path: 'access-denied', component: AccessDeniedComponent },

{ path: 'main', component: MainComponent },
{path :"chat",component:ChatComponent },
{path: 'u',component:UComponent},


// Nouvelle route pour permettre l'accès à la route 4201
{ path: 'chat', redirectTo: 'http://localhost:4201' }, // Redirection vers la route 4201

]

}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
