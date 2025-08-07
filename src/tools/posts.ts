import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { api } from "../config/api.js";

interface ParamUserList {
    id_user: string;
}

interface ParamPost {
    title: string;
    body: string;
    id_user: string;
}

export const postsByUserTool: Tool = {
    name: "posts_user_schema",
    title: "Listagem de posts por usuário",
    description: "Lista os posts de um usuário pelo userId, mas será informado o nome e pelo nome será pego o userId determinado",
    inputSchema: {
        type: "object",
        properties: {
            userId: z.string().describe("Código do usuário") //! Property que é pego e executado durante o prompt
        }
    }
};

export const postsNewsTool: Tool = {
    name: "posts_new_schema",
    title: "Criação de um Post ",
    description: "Realiza o cadastro de um post de um usuário determinado usando o userId",
    inputSchema: {
        type: "object",
        properties: {
            title: z.email().describe("Informe um titulo do post"),
            body: z.string().describe("Escreva uma descrição do post"),
            userId: z.string().describe("Informar o autor do post")
        }
    }
};

export const handlerPosts = async ({ id_user }: ParamUserList) => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    try {
        const request = await fetch(`${api.base}/posts?userId=${id_user}`, {
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

export const handlerNewPost = async ({ title, body, id_user }: ParamPost) => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");

    const raw = JSON.stringify({
        title,
        body,
        userId: id_user
    });

    try {
        const request = await fetch(`${api.base}/posts`, {
            method: "POST",
            headers: myHeaders,
            body: raw,
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