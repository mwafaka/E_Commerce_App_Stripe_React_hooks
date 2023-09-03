import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Product({ item, addToCart }) {
  const handleAddToCart = () => {
    addToCart(item);
  };
  //   const [expanded, setExpanded] = React.useState(false);

  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

  return (
    <Card sx={{ maxWidth: 345, margin: "15px" }}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] ,index:-1}} aria-label="recipe" style={{fontSize:'25px'}}>
        //     M
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.name}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Nike shoes embrace versatility. They re suitable for a variety of
          activities, whether you re hitting the streets, engaging in sports, or
          simply enjoying a leisurely walk. 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <span style={{ fontSize: "10px", margin: "5px" }}>add to cart</span>
        <AddCircleIcon
          aria-label="add to favorites"
          onClick={handleAddToCart}
          disabled={item.inCart}
          className={item.inCart ? "button-disabled" : ""}
          style={{ color: "red" }}
        >
          <FavoriteIcon />
        </AddCircleIcon>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore style={{ fontSize: "15px" }}>
          <span>Price: € {item.price}</span>

          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
