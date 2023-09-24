import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDashboardContext } from "contexts/DashboardConfigContext";
import styles from './DashboardVideos.module.css';
import { useModalFormContext } from "contexts/ModalFormContext";
import { useVideoEditContext } from "contexts/VideoEditContext";

export default function ManageVideos() {
  const { videos } = useDashboardContext();
  const {openModal} = useModalFormContext()
  const {startEditing} = useVideoEditContext()

  const handleClick = (video)=>{
    startEditing(video)
    openModal()
  }

  return (
    <section className={styles.areaTableVideos}>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Categoria</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video => (
          <tr key={video.id}>
              <td>
                {video.titulo}
              </td>
              <td>
                {video.categoria}
              </td>
              <td>
                <IconButton onClick={()=>handleClick(video)}>
                  <Edit/>
                </IconButton>
              </td>
              <td>
                 <IconButton>
                  <Delete/>
                 </IconButton>
              </td>
          </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
