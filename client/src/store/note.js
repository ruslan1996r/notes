import NoteApi from "../api/note"

export default {
  state: {
    notes: [],
    noteLoading: false
  },
  mutations: {
    MUTATION_set_notes(state, notes) {
      state.notes = notes
    },
    MUTATION_note_loading(state, loading) {
      state.noteLoading = loading
    }
  },
  actions: {
    async ACTION_set_notes({ commit }) {
      try {
        commit('MUTATION_note_loading', true)
        const notes = await NoteApi.getAll()
        commit('MUTATION_set_notes', notes)
      } catch (e) {
        console.error('ACTION_set_notes', e)
      } finally {
        commit('MUTATION_note_loading', false)
      }
    },
    async ACTION_delete_note({ commit, getters }, id) {
      try {
        await NoteApi.delete(id)
        const _notes = getters.notes.filter(n => n._id !== id)
        commit('MUTATION_set_notes', _notes)
      } catch (e) {
        console.log('ACTION_delete_note', e)
      }
    },
  },
  getters: {
    notes: (state) => state.notes,
    noteLoading: (state) => state.noteLoading
  }
}