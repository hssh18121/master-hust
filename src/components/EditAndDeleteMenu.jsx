import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const options = ["Chỉnh sửa", "Xóa"];

export default function EditAndDeleteMenu()
{
    const [anchorEl, setAnchorEl] = React.useState();
    const open = Boolean( anchorEl );
    const handleClick = ( event ) =>
    {
        setAnchorEl( event.currentTarget );
    };
    const handleClose = () =>
    {
        setAnchorEl( null );
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon style={{ heigh: 12 }} />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                className="w-36 text-sm"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {options.map( ( option ) => (
                    <MenuItem
                        sx={{fontSize: 13}}
                        key={option}
                        // selected={option === "Pyxis"}
                        onClick={handleClose}
                    >
                        {option}
                    </MenuItem>
                ) )}
            </Menu>
        </div>
    );
}
