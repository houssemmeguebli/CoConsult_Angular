import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './back/project/project.component';
import { AllTemplateBackComponent } from './back/all-template-back/all-template-back.component';
import { FooterBackComponent } from './back/footer-back/footer-back.component';
import { NavbarBackComponent } from './back/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './back/sidebar-back/sidebar-back.component';
import { AllTemplateFrontComponent } from './front/all-template-front/all-template-front.component';
import { FooterFrontComponent } from './front/footer-front/footer-front.component';
import { HeaderFrontComponent } from './front/header-front/header-front.component';
import { HomeFrontComponent } from './front/home-front/home-front.component';
import { HomeBackComponent } from './back/home-back/home-back.component';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentComponent } from './departments/department/department.component';
import { EmpContractComponent } from './emp-contracts/emp-contract/emp-contract.component';
import { DepartupdateComponent } from './departments/departupdate/departupdate.component';
import { DepartaddComponent } from './departments/departadd/departadd.component';
import { DepartdetailComponent } from './departments/departdetail/departdetail.component';
import { EmpcontaddComponent } from './emp-contracts/empcontadd/empcontadd.component';
import { EmpcontdetailComponent } from './emp-contracts/empcontdetail/empcontdetail.component';
import { EmpcontupdateComponent } from './emp-contracts/empcontupdate/empcontupdate.component';
import { CommonModule, DatePipe } from '@angular/common';
import { SignatureInputComponent } from './emp-contracts/signature-input/signature-input.component';
import { LeaveComponent } from './leaves/leave/leave.component';
import { LeaveaddComponent } from './leaves/leaveadd/leaveadd.component';
import { LeavedetailComponent } from './leaves/leavedetail/leavedetail.component';
import { LeaveupdateComponent } from './leaves/leaveupdate/leaveupdate.component';
import { LeavebyuserComponent } from './leaves/leavebyuser/leavebyuser.component'; // Import DatePipe
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PerformanceChartComponent } from './performances/performance-chart/performance-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule } from 'angular-calendar';
import {RouterModule} from "@angular/router";
import { JobOfferComponent } from './back/job-offer/job-offer.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { JobOfferUpdateComponent } from './back/job-offer-update/job-offer-update.component';
import { JobApplicationComponent } from './front/job-application/job-application.component';
import { JobOfferShowComponent } from './front/job-offer-show/job-offer-show.component';
import { AddJobApplicationComponent } from './front/add-job-application/add-job-application.component';
import { InterviewComponent } from './back/interview/interview.component';
import { AddInterviewComponent } from './back/add-interview/add-interview.component';
import { InterviewUpdateComponent } from './back/interview-update/interview-update.component';
import { JitsiMeetComponent } from './jitsi-meet/jitsi-meet.component';
import { StatComponent } from './back/stat/stat.component';
import { ProjectUpdateComponent } from './back/project-update/project-update.component';
import { ProjectCalendarComponent } from './back/project-calendar/project-calendar.component';
import { ProjectStatComponent } from './back/project-stat/project-stat.component';
import { ContratsComponent } from './front/contrats/contrats.component';
import { AddContratComponent } from './front/add-contrat/add-contrat.component';
import { ContratDetailComponent } from './front/contrat-detail/contrat-detail.component';
import { UpdateContratComponent } from './front/update-contrat/update-contrat.component';
import { InvoicesComponent } from './back/invoices/invoices.component';
import { ContratComponent } from './back/contrat/contrat.component';
import { ContratDetailsComponent } from './back/contrat-details/contrat-details.component';
import { AddInvoicesComponent } from './back/add-invoices/add-invoices.component';
import { UpdateContratBackComponent } from './back/update-contrat-back/update-contrat-back.component';
import { InvoicesDetailsComponent } from './front/invoices-details/invoices-details.component';
import { InvoicesDetailComponent } from './back/invoices-detail/invoices-detail.component';
import { ShowInvoicesComponent } from './front/show-invoices/show-invoices.component';
import { StatistiqueComponent } from './front/statistique/statistique.component';
import { ArchiveContratComponent } from './front/archive-contrat/archive-contrat.component';
import { AddTasksComponent } from './back/add-tasks/add-tasks.component';
import { TasksComponent } from './back/tasks/tasks.component';
import { UpdateTasksBackComponent } from './back/update-tasks-back/update-tasks-back.component';
import { StatistiqueTasksComponent } from './back/statistique-tasks/statistique-tasks.component';
import { PerformanceuserComponent } from './performances/performanceuser/performanceuser.component';
import { UserchartComponent } from './performances/userchart/userchart.component';
import { ChatProjectComponent } from './back/chat-project/chat-project.component';


import { UserComponent } from './back/user/user.component';
import { AddUserComponent } from './back/add-user/add-user.component';
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
import { GeminiComponent } from './front/gemini/gemini.component';
import { ConvertTextToHtmlPipe } from './_models/convert-text-to-html.pipe';
import { AddActivityManagementComponent } from './_ActivityManagement/add-activity-management/add-activity-management.component';
import { ListActivityManagementComponent } from './_ActivityManagement/list-activity-management/list-activity-management.component';
import { UpdateActivityManagementComponent } from './_ActivityManagement/update-activity-management/update-activity-management.component';
import { DetailActivityManagementComponent } from './_ActivityManagement/detail-activity-management/detail-activity-management.component';
import { AddReportComponent } from './_addingReports/add-report/add-report.component';
import { ListReportComponent } from './_addingReports/list-report/list-report.component';
import { DetailReportComponent } from './_addingReports/detail-report/detail-report.component';
import { UpdateReportComponent } from './_addingReports/update-report/update-report.component';
import { AddTrainingComponent } from './training/add-training/add-training.component';
import { UpdateTrainingComponent } from './training/update-training/update-training.component';
import { ListTrainingComponent } from './training/list-training/list-training.component';
import { AddMeetingsComponent } from './meetings/add-meetings/add-meetings.component';
import { UpdateMeetingsComponent } from './meetings/update-meetings/update-meetings.component';
import { ListMeetingsComponent } from './meetings/list-meetings/list-meetings.component';
import { FeedbackService } from './_services/feedback.service';
import { FeedbackaddComponent } from './feedbackadd/feedbackadd.component';
import { ListFeedbacksComponent } from './list-feedbacks/list-feedbacks.component';
import { AddConsultantComponent } from './add-consultant/add-consultant.component';
import { ListConsultantComponent } from './list-consultant/list-consultant.component';
import { DetailsConsultantComponent } from './details-consultant/details-consultant.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StoreComponent } from './knowledgeStore/store/store.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MailVerifComponent } from './mail-verif/mail-verif.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ListeParticipantsComponent } from './training/liste-participants/liste-participants.component';
import { TaskTrackerComponent } from './training/task-tracker/task-tracker.component';
import { TaskProgressComponent } from './training/task-progress/task-progress.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { TaskProgressFrontComponent } from './_ActivityManagement/task-progress1/task-progress.component';
import { TasksTeamComponent } from './back/tasks-team/tasks-team.component';
import { UpdateTasksTeamsComponent } from './back/update-tasks-teams/update-tasks-teams.component';
import { ProjectService } from './_services/project.service';
import {Project_2Component} from "./back/project_2/project_2.component";

import { MatIconModule } from '@angular/material/icon';

import { ReclamationComponent } from './back/reclamation/reclamation.component';
import { ReclamationAdminComponent } from './back/reclamation-admin/reclamation-admin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReclamationDialogComponent } from './back/reclamation-dialog/reclamation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    HomeFrontComponent,
    HomeBackComponent,
    DepartmentComponent,
    EmpContractComponent,
    DepartupdateComponent,
    DepartaddComponent,
    DepartdetailComponent,
    EmpcontaddComponent,
    EmpcontdetailComponent,
    EmpcontupdateComponent,
    SignatureInputComponent,
    LeaveComponent,
    LeaveaddComponent,
    LeavedetailComponent,
    LeaveupdateComponent,
    LeavebyuserComponent,
    PerformanceChartComponent,
    JobOfferComponent,
    JobOfferUpdateComponent,
    JobApplicationComponent,
    JobOfferShowComponent,
    AddJobApplicationComponent,
    InterviewComponent,
    AddInterviewComponent,
    InterviewUpdateComponent,
    JitsiMeetComponent,
    StatComponent,
    ProjectUpdateComponent,
    ProjectCalendarComponent,
    ProjectStatComponent,
    ContratsComponent,
    AddContratComponent,
    ContratDetailComponent,
    UpdateContratComponent,
    InvoicesComponent,
    ContratComponent,
    ContratDetailsComponent,
    AddInvoicesComponent,
    UpdateContratBackComponent,
    InvoicesDetailsComponent,
    InvoicesDetailComponent,
    ShowInvoicesComponent,
    StatistiqueComponent,
    ArchiveContratComponent,
    AddTasksComponent,
    TasksComponent,
    UpdateTasksBackComponent,
    StatistiqueTasksComponent,
    PerformanceuserComponent,
    UserchartComponent,
    ChatProjectComponent,
    TaskProgressFrontComponent,
    UserComponent,
    AddUserComponent,
    RegisterComponent,
    LoginComponent,
    UpdateUserComponent,
    ProfileComponent,
    ViewProfileComponent,
    AccessDeniedComponent,
    RoleStatComponent,
    BotChatComponent,
    GraphComponent,
    ProfileFrontComponent,
    ChatComponent,
    MainComponent,
    UComponent,
    ReclamationComponent,
    GeminiComponent,
    AddActivityManagementComponent,
    ListActivityManagementComponent,
    UpdateActivityManagementComponent,
    DetailActivityManagementComponent,
    AddReportComponent,
    ListReportComponent,
    DetailReportComponent,
    UpdateReportComponent,
    AddTrainingComponent,
    UpdateTrainingComponent,
    ListTrainingComponent,
    AddMeetingsComponent,
    UpdateMeetingsComponent,
    ListMeetingsComponent,
    FeedbackaddComponent,
    ListFeedbacksComponent,
    AddConsultantComponent,
    ListConsultantComponent,
    DetailsConsultantComponent,
    StoreComponent,
    MailVerifComponent,
    StatisticsComponent,
    ListeParticipantsComponent,
    TaskTrackerComponent,
    TaskProgressComponent,
    TasksTeamComponent,
    UpdateTasksTeamsComponent,
    Project_2Component,
    ReclamationComponent,
    ReclamationAdminComponent,
    ReclamationAdminComponent,
    ReclamationDialogComponent,

  ],
  imports: [
    MatIconModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxChartsModule,
    RouterModule,
    CalendarModule,
    FullCalendarModule,
    CommonModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
     // Assurez-vous d'importer ReactiveFormsModule ici
  ],
  providers: [DatePipe, FeedbackService, { provide: MatPaginatorIntl, useClass: MatPaginatorIntl }],

  bootstrap: [AppComponent]
})
export class AppModule { }
