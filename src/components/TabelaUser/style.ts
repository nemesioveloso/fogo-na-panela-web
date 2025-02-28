import styled from "styled-components";

export const ProductsList = styled.div`
  flex: 1;
  overflow-x: auto;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

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

  
  @media (max-width: 1100px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }
    
    thead {
      display: none;
    }
    
    table {
      min-width: 100%; 
    }
    
    tbody {
      tr {
        margin-bottom: 1rem; 
        /* border: 1px solid #ccc; */
        border-radius: 8px;
        display: block;
        
        td {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: none;
          padding: 0.5rem 1rem;
          position: relative;
          text-align: left;
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
