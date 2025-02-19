import axios from 'axios'

const baseurl = 'http://localhost:3000/api/groups'

const getGroups = async () => {
    const response = await axios.get(baseurl)
    return response.data
}

const getGroupById = async (id) => {
    const response = await axios.get(`${baseurl}/${id}`)
    return response.data
}

const getUserGroups = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/users/${id}`)
    return response.data.groups
}

const addGroup = async (group, userid) => {
    const response = await axios.post(baseurl, {...group})
    const newGroup = response.data

    const user = (await axios.get(`http://localhost:3000/api/users/${userid}`)).data
    user.groups = user.groups.map(group => group.id)
    user.groups = user.groups.concat(newGroup.id)
    user.tasksCompleted = user.tasksCompleted.map(task => task.id)
    const newUser = (await axios.put(`http://localhost:3000/api/users/${userid}`, user)).data

    return newGroup
}

const joinGroup = async (groupid, userid) => {
    const group = (await axios.get(`${baseurl}/${groupid}`)).data
    group.members = group.members.map(member => member.id)
    group.tasks = group.tasks.map(task => task.id)
    const newMembers = group.members.concat(userid)
    const response = await axios.put(`${baseurl}/${groupid}`, {...group, members: newMembers})
    const user = (await axios.get(`http://localhost:3000/api/users/${userid}`)).data
    user.groups = user.groups.map(group => group.id)
    user.groups = user.groups.concat(groupid)
    user.tasksCompleted = user.tasksCompleted.map(task => task.id)
    const newUser = (await axios.put(`http://localhost:3000/api/users/${userid}`, user)).data

    return response.data //this is the newly updated group
}

export default {getGroups, addGroup, getUserGroups, joinGroup, getGroupById}