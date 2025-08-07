import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import {api} from "../config/api.js";

/**
 * Schema de uma tool, ela serve de um modelo onde a LLM vai consultar / entender / usar durante o chat
 * Ele vai centralizar as informações tanto de entrada e saida com base nos contextos
 */
export const usersTool: Tool = {
    name: "usuarios_schema", //nome da tool
    title: "Lista de usuários", // titulo da tool
    description: "Realiza uma busca de usuarios na api para mostrar, onde o principal dado (nome, email, dados de empresa e telefone)",  // sempre tentar colocar uma desc que a LLM entenda bem o contexo
    inputSchema: {
        type: "object",
        properties: {}
    }
    // outputSchema: {
    //     type: "object",
    //     properties: {
    //         content: z.array(z.object({
    //             type: z.string(), // Tipo de conteúdo, pode ser text ou image, por exemplo
    //             text: z.string()
    //         }))
    //     }
    // }
};

export const usersNewTool: Tool = {
    name: "usuarios_novo_schema", //nome da tool
    title: "Novo cadastro de usuarios", // titulo da tool
    description: "Você vai cadastrar um novo usuário simples com dados simples", // sempre tentar colocar uma desc que a LLM entenda bem o contexo
    inputSchema: {
        type: "object",
        properties: {
            email: z.email().describe("E-mail do usuário"),
            senha: z.string().describe("Senha do usuario")
        }
    }
    // outputSchema: {
    //     type: "object",
    //     properties: {
    //         content: z.array(z.object({
    //             type: z.string(), // Tipo de conteúdo, pode ser text ou image, por exemplo
    //             text: z.string()
    //         }))
    //     }
    // }
};

export const handlerUser = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    try {
        const request = await fetch(`${api.base}/users`, {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        });

        const response = await request.json();

        return {
            content: [{
                type: "text",
                text: JSON.stringify(response)
            }]
        };
    } catch (error) {
        return {
            content: [{
                type: "text",
                text: "Houve um erro ao realizar o login. Tente novamente !"
            }]
        };
    }
};