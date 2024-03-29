import AuthPage from "@/components/pages/auth/AuthPage";
import NotFoundPage from "@/components/pages/NotFoundPage";
import LogoutPage from "@/components/pages/auth/LogoutPage";
import Home from "@/components/pages/home/Home";
import EventsPage from "@/components/pages/events/EventsPage";
import MapPage from "@/components/pages/events/pages/map/MapPage";
import LocalEventsPage from "@/components/pages/events/pages/local/LocalEventsPage"
import ProfilePage from "@/components/pages/profile/ProfilePage";
import ProfileInfo from "@/components/pages/profile/forms/ProfileInfo";
import OwnedEventsPage from "@/components/pages/events/pages/Owned/OwnedEventsPage";
import ParticipatingEventPage from "@/components/pages/events/pages/participating/ParticipatingEventPage";
import Settings from "@/components/pages/profile/Settings";

export default [
    //Not found placeholder
    {path: '/:NotFound(.*)', component: NotFoundPage},

    //
    {path: '/', redirect: '/home'},

    //Authentication
    {path: '/login', component: AuthPage, name: 'login', meta: {requiresUnauth: true}},
    {path: '/register', component: AuthPage, name: 'register', meta: {requiresUnauth: true}},
    {path: '/reset-password', component: AuthPage, name: 'reset-password', meta: {requiresUnauth: true}},

    //User actions
    {path: '/home', component: Home, name: 'home', meta: {requiresAuth: true}},
    {path: '/logout', component: LogoutPage, name: 'logout', meta: {requiresAuth: true}},

    {
        path: '/events',
        component: EventsPage,
        name: 'events',
        meta: {requiresAuth: true},
        redirect: {name: 'events-map'},
        children: [
            {path: 'map', component: MapPage, name: 'events-map'},
            {path: 'owned', component: OwnedEventsPage, name: 'events-owned'},
            {path: 'participating', component: ParticipatingEventPage, name: 'events-participating'},
            {path: 'local', component: LocalEventsPage, name: 'events-local'},
        ]
    },
    {
        path: '/profile',
        component: ProfilePage,
        name: 'profile',
        meta: {requiresAuth: true},
        redirect: {name: 'profile-info'},
        children: [
            {path: 'info', component: ProfileInfo, name: 'profile-info'},
            {path: 'settings', component: Settings, name: 'profile-settings'},
        ]
    },
    {path: '/friend', component: NotFoundPage, name: 'participating', meta: {requiresAuth: true}},


];
