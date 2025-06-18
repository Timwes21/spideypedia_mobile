export default function useRoutes(){
    const developing=false;
    const base = developing?"http://localhost:3000":"https://spideypedia-production.up.railway.app";
    const wsLink = developing?"ws://localhost:3000":"wss://spideypedia-production.up.railway.app";
    const comicsBase = base + "/comics";
    const authBase = base + "/auth";
    const submitToAgentWs = developing?"ws://127.0.0.1:8000/ws":"wss://intuitive-smile-production.up.railway.app/ws";
    const uploadPicRoute = developing? "http://192.168.4.110:8000/add-by-photo": "https://intuitive-smile-production.up.railway.app/add-by-photo"
    const undoRoute = developing? "http://127.0.0.1:8000/undo": "https://intuitive-smile-production.up.railway.app/undo";
    return { base, wsLink, comicsBase, authBase, submitToAgentWs, uploadPicRoute, undoRoute }
}