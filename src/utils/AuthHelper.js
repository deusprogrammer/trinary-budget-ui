export default {
    createConfig: () => {
        console.log("FUCK OFF ODIN")
        return {
            headers: {
                "X-Access-Token": window.localStorage.getItem("accessToken")
            }
        }
    }
}
