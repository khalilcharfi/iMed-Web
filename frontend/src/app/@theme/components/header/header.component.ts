import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from 'app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  userName: string;
  profileImg: any;
  connection: any;
  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: AuthService,
    public router: Router
  ) {
    this.getUserAdmin();
  }

  ngOnInit() {

    this.connection = this.authService.urlDomain;
    this.menuService.onItemClick().subscribe((event) => {
      this.onContecxtItemSelection(event.item.title);
    });
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }


  async getUserAdmin() {
    this.userName = localStorage.getItem('user');


    this.authService.getUserData().subscribe((res: any) => {
      if (res[0].image) {
        this.profileImg = `${this.connection}/profile/`+ res[0].image;
      } else {
        this.profileImg = "./assets/images/profile.png";
      }

      console.log(res)
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onContecxtItemSelection(title) {
    if (title === "Log out") {
      this.authService.logout();
      this.router.navigateByUrl('/login');
    } else if (title === "Users") {
      this.router.navigate(['./../../../admin/users']);
    } else {
      // this.router.navigate(['./../../../admin/profile']);
    }
  }
}
