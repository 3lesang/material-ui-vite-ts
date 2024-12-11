import { useApp } from "@/contexts/app";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";

interface DeleteActionProps {
  onDelete?: () => void;
}

function DeleteAction(props: DeleteActionProps) {
  const { confirm } = useApp();
  const handleDeleteClick = async () => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description:
        "This action cannot be undone. This will permanently delete the item.",
    });
    if (confirmed) {
      props?.onDelete?.();
    }
  };

  return (
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={handleDeleteClick}
    />
  );
}

export default DeleteAction;
