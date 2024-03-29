import styles from "./table.module.scss";
import Link from "next/link";
import formatData from "../../services/formatData";
import { IoMdImages } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { ChangeEvent } from "react";
// import success icon
import { IoMdCheckmarkCircle } from "react-icons/io";

/* type Produto =
  {
    id: string;
    codigo_interno: string;
    descricao: string;
    codigo_referencia: string;
    aplicacao: string;
    marca: string;
    marcaId: string;
    createdAt: string;
    updatedAt: string;
  }; */

type Column = {
  name: string;
};

type TableProps = {
  data: [];
  columns: Column[];
  changeImages: (e: ChangeEvent<HTMLInputElement>, id: string, produto: any) => void;
  deletarItem: (e: any, id: string) => void;
};

const Table = ({ data, columns, changeImages, deletarItem }: TableProps) => {
  console.log(data);
  return (
    <>
      <div className={styles.containerTableProdutos}>
        <table className={styles.tableProdutos}>
          <thead className={styles.headerTableProdutos}>
            <tr>
              {columns.map(
                (column, index) =>
                  column.name !== "Aplicação" &&
                  column.name !== "Codigo de referência" &&
                  column.name !== "Marca" && <th key={index}>{column.name}</th>
              )}
            </tr>
          </thead>
          <tbody className={styles.bodyTableProdutos}>
            {data.map((produto: any, key) => (
              // percorrer o objeto produto e pegar o valor de cada propriedade para ser uma coluna da tabela

              <tr key={key} className={styles.contentTableProdutos}>
                <td>
                  <div className={styles.column}>{produto.codigo_interno}</div>{" "}
                </td>
                <td>
                  <div className={styles.column + " " + styles.columnDesc}>
                    {produto.descricao || "Produto sem nome"}
                  </div>
                </td>
                {/*  <td><div className={styles.column}>{produto.codigo_referencia}</div></td> */}
                {/*     <td><div className={styles.column}>{produto.aplicacao}</div></td> */}
                {/*   <td><div className={styles.column}>{produto.marca}</div></td> */}
                <td>
                  <div className={styles.column}>
                    {formatData(produto.createdAt)}
                  </div>
                </td>
                <td>
                  <div className={styles.column}>
                    {formatData(produto.updatedAt)}
                  </div>
                </td>
                <td>
                  <div className={styles.column}>
                    <label htmlFor={`images${key}`} className={styles.imagesEditContainer}>
                      <div className={styles.imagesEdit}>
                        <IoMdImages
                          size={25}
                          className={styles.iconButton}
                        ></IoMdImages>
                      </div>
                      {produto.uploads.length > 0 ? (
                         <IoMdCheckmarkCircle size={13}></IoMdCheckmarkCircle>
                      ) : (
                        <VscError size={13}></VscError>
                      )}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      id={`images${key}`}
                      style={{ display: "none" }}
                      onChange={(e) => changeImages(e, produto.id, produto)}
                    />
                  </div>
                </td>
                <td>
                  <div className={styles.column}>
                    <Link
                      href={{
                        pathname: `/admin/produtos/editar`,
                        query: { id: produto.id },
                      }}
                    >
                      <a className={styles.iconButton}>
                        <FaEdit size={22}></FaEdit>
                      </a>
                    </Link>
                  </div>
                </td>
                <td>
                  <RiDeleteBinFill
                    onClick={(e) => deletarItem(e, produto.id)}
                    size={22}
                    className={styles.iconButton}
                  ></RiDeleteBinFill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
