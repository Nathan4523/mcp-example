import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

//* Importando as tools - Schema e funções
import { usersTool, handlerUser } from "./tools/users.js";
import { postsByUserTool, handlerPosts, handlerNewPost } from "./tools/posts.js";

//? Create server instance
//? Criando uma instância de server para executar as tools
const server = new Server({
    name: "mcp-example",
    version: "1.0.0"
}, {
    capabilities: {
        tools: {}
    }
});

//? Registrar e mostrar as tools que ficaram disponiveis para a LLM usar
/**
 * Modelo de schema para a tool
 *  name: string,
    title: string,
    description: string,
    inputSchema: {
        type: "object",
        properties: object
    }
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            //schema sempre em formato de json
            usersTool,
            postsByUserTool
            // expositoresSegmentoTool
        ]
    };
});

//? Executa as tool com base no nome (schema definido em name) em que a LLM usa
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    switch (request.params.name) {
        case "usuarios_schema":
            return await handlerUser();
        case "posts_user_schema":
            return await handlerPosts({
                id_user: request.params.arguments ? String(request.params.arguments.userId) : ''
            });
        case "posts_new_schema":
            return await handlerNewPost({
                id_user: request.params.arguments ? String(request.params.arguments.userId) : '',
                title: request.params.arguments ? String(request.params.arguments.title) : '',
                body: request.params.arguments ? String(request.params.arguments.body) : ''
            });
        default:
            throw new Error("Tool not found");
    }
});

//? Concentra as chamadas para o server e executa
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("ContatoMais MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});