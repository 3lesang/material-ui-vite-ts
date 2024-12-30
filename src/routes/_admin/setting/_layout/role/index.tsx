import data from '@/data/role'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/setting/_layout/role/')({
  component: RouteComponent,
})

function RouteComponent() {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      sortable: false,
      disableColumnMenu: true,
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: false,
      disableColumnMenu: true,
      width: 500,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      getActions(params) {
        return [
          <Link to={`/setting/role/${params?.id}`}>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Link>,
          <IconButton size="small">
            <DeleteOutlineIcon />
          </IconButton>,
        ]
      },
    },
  ]

  return (
    <Card>
      <CardHeader
        title="Role"
        action={
          <Button
            component={Link}
            to="/setting/role/new"
            startIcon={<AddOutlinedIcon />}
          >
            Add new item
          </Button>
        }
      />
      <DataGrid columns={columns} rows={data} hideFooter rowSelection={false} />
    </Card>
  )
}
