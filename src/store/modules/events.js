import api from '@/api'

export default {
    state() {
        return {
            events: [],
            createdEvents: [],
            eventTypes: [],
            participatingEvents: [],
            searchDistance: 5,
            searchDistanceMin: 5,
            searchDistanceMax: 50,
            searchDistanceStep: 1,
            clickedPosition: null,
            createEventEnabled: false,
        }
    },
    getters: {
        events(state) {
            return state.events;
        },
        eventTypes(state) {
            return state.eventTypes;
        },
        createdEvents(state) {
            return state.createdEvents;
        },
        searchDistance(state) {
            return state.searchDistance;
        },
        searchDistanceMin(state) {
            return state.searchDistanceMin;
        },
        searchDistanceMax(state) {
            return state.searchDistanceMax;
        },
        searchDistanceStep(state) {
            return state.searchDistanceStep;
        },
        searchDistanceKM(state) {
            return state.searchDistance * 1000;
        },
        clickedPosition(state) {
            return state.clickedPosition;
        },
        createEventEnabled(state) {
            return state.createEventEnabled;
        }
    },
    mutations: {
        setEventTypes(state, payload) {
            state.eventTypes = payload;
        },
        setClickedPosition(state, payload) {
            state.clickedPosition = payload;
        },
        setEvents(state, payload) {
            state.events = payload;
        },
        setCreatedEvents(state, payload) {
            state.createdEvents = payload;
        },
        toggleCreateEventEnabled(state) {
            state.createEventEnabled = !state.createEventEnabled;
        },
        setSearchDistance(state, payload) {
            if (payload < state.searchDistanceMin) state.searchDistance = state.searchDistanceMin;
            else if (payload > state.searchDistanceMax) state.searchDistance = state.searchDistanceMax;
            else state.searchDistance = payload;
        }
    },
    actions: {
        setEventTypes(context, payload) {
            context.commit('setEventTypes', payload);
        },
        toggleCreateEventEnabled(context) {
            context.commit('toggleCreateEventEnabled');
        },
        setClickedPosition(context, payload) {
            context.commit('setClickedPosition', payload);
        },
        setSearchDistance(context, payload) {
            context.commit('setSearchDistance', payload);
        },

        async getEventTypes(context) {
            context.commit('setResponseError', '');
            context.commit('setIsApiSyncActive', true);
            try {
                const response = await api.events.getEventTypes();
                const data = response.data.data;
                context.commit('setEventTypes', data);
                console.log(data);
            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError', handledError);
            }
            context.commit('setIsApiSyncActive', false);

        },

        async getEvents(context) {
            context.commit('setResponseError', '');
            context.commit('setIsApiSyncActive', true);
            try {
                const response = await api.events.getEvents({
                    params: {distance: context.getters.searchDistance},
                });
                const data = response.data.data;
                context.commit('setEvents', data);
                console.log(data);
            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError', handledError);
            }
            context.commit('setIsApiSyncActive', false);
        },

        async getCreatedEvents(context) {
            context.commit('setResponseError', '');
            context.commit('setIsApiSyncActive', true);
            try {
                const response = await api.events.getCreatedEvents(
                    // {params: { distance: context.getters.searchDistance}},
                );
                const data = response.data.data;
                context.commit('setCreatedEvents', data);
                context.commit('setResponseMessage', response.data.message);
            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError', handledError);
            }
            context.commit('setIsApiSyncActive', false);
        },

        async createEvent(context, payload) {
            context.commit('setResponseError', '');
            context.commit('setIsApiSyncActive', true);
            try {
                await api.events.createEvent(payload);
                const response = await api.events.createEvent(payload);
                console.log(response)
                context.commit('setResponseMessage', response.data.message);

            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError', handledError);
            }
            context.commit('setIsApiSyncActive', false);
        },
    },
}
