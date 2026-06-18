export const getActiveProfileId = () => sessionStorage.getItem('activeProfileId')
export const setActiveProfileId = (id) => sessionStorage.setItem('activeProfileId', id)
export const clearActiveProfile = () => sessionStorage.removeItem('activeProfileId')
