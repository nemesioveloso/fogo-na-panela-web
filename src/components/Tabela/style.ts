import styled from "styled-components";

export const ProductsList = styled.div`
  flex: 1;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    thead {
      tr {
        th {
          background-color: #212121;
          padding: 1rem;
          text-align: center;
          color: #e1e1e6;
          font-size: 0.875rem;
          line-height: 1.6;
        }
      }
    }

    tbody {
      tr {
        td {
          background-color: #c4c4cc;
          text-align: center;
          border-top: 4px solid #e1e1e6;
          padding: 1rem;
          font-size: 1rem;
          line-height: 1.6;
        }
      }
    }
  }

  /* ========== TELA PEQUENA: TRANSFORMA TABELA EM CARDS ========== */
  @media (max-width: 768px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }

    thead {
      /* Oculta o cabeçalho em telas menores */
      display: none;
    }

    table {
      min-width: 100%; /* deixa o table 100% na tela pequena */
    }

    tbody {
      tr {
        margin-bottom: 1rem; /* espaçamento entre "cards" */
        border: 1px solid #ccc;
        border-radius: 8px;
        display: block; /* cada linha é um bloco isolado */

        td {
          /* Cada célula vira uma linha */
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: none; /* remove bordas extras */
          padding: 0.5rem 1rem;
          position: relative;
          text-align: left;

          /* 
            Se quiser que o label fique antes do valor, 
            use o pseudo-elemento ::before com o conteúdo de data-label 
          */
          &::before {
            content: attr(data-label);
            font-weight: bold;
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
`;
