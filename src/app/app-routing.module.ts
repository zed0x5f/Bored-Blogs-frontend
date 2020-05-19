import { UsersListComponent } from './pages/users-list/users-list.component';
import { ContributersProfileComponent as ContributorsProfileComponent, ContributersProfileComponent } from './pages/contributers-profile/contributers-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BootDemoComponent } from './pages/boot-demo/boot-demo.component';
import { AllPostComponent } from './pages/all-post/all-post.component';
import { HomeComponent } from './pages/home/home.component';
import { ContributorsComponent } from './pages/contributors/contributors.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { PostDetailComponent } from './pages/all-post/post-detail/post-detail.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { PostListComponent } from './pages/admin-dashboard/post-list/post-list.component';
import { PostAddComponent } from './pages/admin-dashboard/post-add/post-add.component';
import { PostEditComponent } from './pages/admin-dashboard/post-edit/post-edit.component';
import { PostCommentComponent } from './pages/all-post/post-comment/post-comment.component';
import { CommentDeleteComponent } from './pages/all-post/comment-delete/comment-delete.component';
import { CommentEditComponent } from './pages/all-post/comment-edit/comment-edit.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';



const make = (url: string, title: string, component: any, isPartOfNav: boolean) => {
  return {
    path: url,
    title: title,
    component: component,
    isPartOfNav: isPartOfNav
  }
};
/*
I made this class so other components can get a reference to the routes and page components


R = routes
use R.getRoutes() to get routes
*/

export class R {
  private static outes: Routes = [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    // NAVBAR Titles & Order
    make('home', 'Home', HomeComponent, true),
    make('boot', 'Bootstrap Demo', BootDemoComponent, false),
    make('all', 'View All Posts', AllPostComponent, true),
    make('contributor', 'Meet the Contributors', ContributorsComponent, false), //JACKIE: In nav "Contributors" dropdown list
    make('contact-us', 'Contact Us', ContactUsComponent, false), //JACKIE: In nav "Contributors" dropdown list
    make('sign-in', 'Log In', SignInComponent, false), //JACKIE: In nav "Users" dropdown list
    make('contributor-profile/:id', 'Contributor Profile', ContributorsProfileComponent, false),
    make('create-account', 'Create account', CreateAccountComponent, true),
    make('post-detail/:id', 'Post Detail', PostDetailComponent, false),
    make('post-list', 'Post List', PostListComponent, false),
    make('post-add', 'Post Add', PostAddComponent, false),
    make('post-edit/:id', 'Post Edit', PostEditComponent, false),
    make('post-comment/:id', 'Post Comment', PostCommentComponent, false),
    make('comment-delete/:id', 'Comment Delete', CommentDeleteComponent, false),
    make('comment-edit/:id', 'Comment Edit', CommentEditComponent, false),//JACKIE: In nav "Contributors" dropdown list
    make('admin', 'Admin', AdminDashboardComponent, false), // need to turn this back to false once admins have ability to sign in
    make('users-list', 'users-list', UsersListComponent, false), 
    make('user-profile/:id', 'User Profile', UserProfileComponent, false), //also for Change password //JACKIE: In nav "Users" dropdown list
    make('sign-out', 'Log Out', SignOutComponent, false) //JACKIE: In nav "Users" dropdown list
  ];

  static getRoutes(): Routes {
    return R.outes;
  }

  static getRoutesForNavigation(): Routes {
    return R.outes.filter((e: any) => e.isPartOfNav);
  }

  static getPaths(): string[] {
    return R.outes.filter(e => e['redirectTo'] !== undefined).map(e => e.path);
  }

  static getComponent(): any[] {
    return R.outes.filter(e => e['component'] !== undefined).map(e => e.component);
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(R.getRoutes())],
  exports: [RouterModule]
})
export class AppRoutingModule { }
