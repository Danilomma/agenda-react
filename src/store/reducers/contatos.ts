import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Contato from "../../models/Contato";

type ContatosState = {
  itens: Contato[];
};

const initialState: ContatosState = {
  itens: [
    {
      id: 1,
      name: "Danilo Eu sou o Mior",
      email: "nilodani4@gmail.com",
      tell: '51995835050',
    },
    {
      id: 2,
      name: "João Rei delas",
      email: "matadordeporco@gmail.com",
      tell: '5196666666',
    },
    {
      id: 3,
      name: "Wesley Safadão",
      email: "cantamal@gmail.com",
      tell: '51993299999',
    },
    {
      id: 4,
      name: "Larissinha Vingadora",
      email: "Lari@gmail.com",
      tell: '519954545444',
    }
  ]
}

const contatosSlice = createSlice({
  name: "Contatos",
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
        state.itens = state.itens.filter((contato) => contato.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Contato>) => {
        const indexContato = state.itens.findIndex((contato) => contato.id === action.payload.id) 

        if(indexContato >= 0) {
            state.itens[indexContato] = action.payload
        }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contato, 'id'>>) => {
      const contatoExistente = state.itens.find(contato => contato.name.toLowerCase() === action.payload.name.toLowerCase()) 

      if(contatoExistente) {
        alert('Já existe um contato com este nome na agenda :D')
      } else {
        const ultimoContato = state.itens[state.itens.length - 1]
        
        const novaTarefa = {
          ...action.payload,
          id: ultimoContato ? ultimoContato.id + 1 : 1
        }

        state.itens.push(novaTarefa)
      }
    }
  },
})

export const { remover, editar, cadastrar } = contatosSlice.actions

export default contatosSlice.reducer
