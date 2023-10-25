import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Slider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const brands = [
  "Xara",
  "Tanishq",
  "Turban",
  "Goldless",
  "Goldie",
  "Diamond Square",
  "Spike",
];
const colors = ["Silver", "Gold", "Black"];
function FilterBrands({ EditFilters, searchParams }) {
  const Brands = searchParams || [];
  const addFilter = (value) => () => {
    EditFilters((prev) => ({
      ...prev,
      BRAND:
        prev.BRAND?.findIndex((brand) => brand === value) === -1
          ? [...prev.BRAND, value]
          : prev.BRAND?.filter((brand) => brand !== value),
    }));
  };
  return (
    <Accordion>
      <AccordionSummary
        sx={{
          "& .MuiAccordionSummary-content": {
            gap: "0.5rem",
            alignItems: "center",
          },
        }}
        expandIcon={
          <ExpandMoreIcon
            sx={{
              fontSize: "1.1rem",
            }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="body1"
          sx={{
            ml: 2,
            color: "white",
          }}
        >
          Brand
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List
          sx={{
            pt: 0,
            pl: "8px",
          }}
        >
          {brands.map((value, index) => {
            const labelId = `checkbox-list-label-${index}`;
            return (
              <ListItem
                key={index}
                disableGutters
                disablePadding
                sx={{
                  "& .MuiButtonBase-root.MuiListItemButton-root": {
                    py: 0.3,
                    "&:hover": {
                      backgroundColor: "inherit !important",
                    },
                  },
                  "& .MuiListItemIcon-root": {
                    minWidth: "auto",
                  },
                  "& span": {
                    py: 0,
                  },
                }}
              >
                <ListItemButton onClick={addFilter(value)} dense disableRipple>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={
                        Brands.findIndex(
                          (searchBrand) => searchBrand === value
                        ) !== -1
                      }
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      size={"small"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={
                      <Typography
                        variant="body2"
                        color={"text.secondary"}
                        fontWeight={600}
                        sx={{
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                      >
                        {value}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
function FilterPrice({ EditFilters, searchParams }) {
  const [Price, setPrice] = useState(
    searchParams
      ? searchParams.split("-").map((Price) => Number(Price))
      : [500, 950]
  );
  const handleChange = (event, value) => setPrice(value);
  const FilterPrice = () => EditFilters((prev) => ({ ...prev, PRICE: Price }));

  return (
    <Accordion>
      <AccordionSummary
        sx={{
          "& .MuiAccordionSummary-content": {
            gap: "0.5rem",
            alignItems: "center",
          },
        }}
        expandIcon={
          <ExpandMoreIcon
            sx={{
              fontSize: "1.1rem",
            }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="body1"
          sx={{
            ml: 2,
            color: "white",
          }}
        >
          Price
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Slider
          getAriaLabel={() => "Price range"}
          value={Price}
          onChange={handleChange}
          min={500}
          max={950}
          valueLabelDisplay="auto"
          sx={{
            width: "90%",
            color: "rgb(232, 168, 110)",
            margin: "auto",
          }}
        />
        <Typography
          style={{
            textAlign: "center",
            color: "text.primary",
            fontSize: "2rem",
          }}
        >
          {Price.join(" - ")}
        </Typography>
        <Button variant="outlined" sx={{ width: "100%" }} onClick={FilterPrice}>
          Filter
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}
function FilterColor({ EditFilters, searchParams }) {
  const Colors = searchParams || [];
  const addFilter = (value) => () => {
    EditFilters((prev) => ({
      ...prev,
      COLOR:
        prev.COLOR.findIndex((color) => color === value) === -1
          ? [...prev.COLOR, value]
          : prev.COLOR.filter((color) => color !== value),
    }));
  };
  return (
    <Accordion>
      <AccordionSummary
        sx={{
          "& .MuiAccordionSummary-content": {
            gap: "0.5rem",
            alignItems: "center",
          },
        }}
        expandIcon={
          <ExpandMoreIcon
            sx={{
              fontSize: "1.1rem",
            }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="body1"
          sx={{
            ml: 2,
            color: "white",
          }}
        >
          Color
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List
          sx={{
            pt: 0,
            pl: "8px",
          }}
        >
          {colors.map((value, index) => {
            const labelId = `checkbox-list-label-Color-${index}`;
            return (
              <ListItem
                key={index}
                disableGutters
                disablePadding
                sx={{
                  "& .MuiButtonBase-root.MuiListItemButton-root": {
                    py: 0.3,
                    "&:hover": {
                      backgroundColor: "inherit !important",
                    },
                  },
                  "& .MuiListItemIcon-root": {
                    minWidth: "auto",
                  },
                  "& span": {
                    py: 0,
                  },
                }}
              >
                <ListItemButton onClick={addFilter(value)} dense disableRipple>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={
                        Colors.findIndex(
                          (searchBrand) => searchBrand === value
                        ) !== -1
                      }
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      size={"small"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={
                      <Typography
                        variant="body2"
                        color={"text.secondary"}
                        fontWeight={600}
                        sx={{
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                      >
                        {value}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
export { FilterBrands, FilterColor, FilterPrice };
