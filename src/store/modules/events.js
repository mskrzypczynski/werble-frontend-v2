import api from '@/api'

export default {
    state() {
        return{
            events : [],
            createdEvents: [],
            participatingEvents: [],
            searchDistance: 10,
            searchDistanceMin: 4,
            searchDistanceMax: 40,
            searchDistanceStep: 4,
            clickedPosition: null,
        }
    },
    getters: {
        events(state){
            return state.events;
        },
        createdEvents(state){
            return state.createdEvents;
        },
        searchDistance(state){
            return state.searchDistance;
        },
        searchDistanceMin(state){
            return state.searchDistanceMin;
        },
        searchDistanceMax(state){
            return state.searchDistanceMax;
        },
        searchDistanceStep(state){
            return state.searchDistanceStep;
        },
        searchDistanceKM(state){
            return state.searchDistance * 1000;
        },
        clickedPosition(state){
            return state.clickedPosition;
        }
    },
    mutations: {
        setClickedPosition(state,payload){
            state.clickedPosition = payload;
        },
        setEvents(state,payload){
            state.events = payload;
        },
        setCreatedEvents(state,payload){
            state.createdEvents = payload;
        },
        setSearchDistance(state,payload){
            if (payload < 4) state.searchDistance = 4;
            else if(payload > 40) state.searchDistance =40;
            else state.searchDistance = payload;
        }
    },
    actions: {
        setSearchDistance(context,payload) {
            context.commit('setSearchDistance',payload);
        },
        async getEvents(context){
            context.commit('setResponseError','');
            context.commit('setIsApiSyncActive',true);
            try
            {
                const response = await api.events.getEvents({
                    params: { radius: context.getters.searchDistanceKM},
                });
                const data = response.data.data;
                context.commit('setEvents',data);
                console.log(data);
            }
            catch(error){
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },

        async getCreatedEvents(context){
            context.commit('setResponseError','');
            context.commit('setIsApiSyncActive',true);
            try
            {
                const response = await api.events.getCreatedEvents(
                    {params: { distance: context.getters.searchDistance}},
                );
                const data = response.data.data;
                context.commit('setCreatedEvents',data);
                context.commit('setResponseMessage',response.data.message);
            }
            catch(error){
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },

        async createEvent(context,payload){
            context.commit('setResponseError','');
            context.commit('setIsApiSyncActive',true);
            try {
                await api.events.createEvent(payload);
                const response = await api.events.createEvent(payload);
                console.log(response)
                context.commit('setResponseMessage',response.data.message);
            }
            catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },
    },
}
