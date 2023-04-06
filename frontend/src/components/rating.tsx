import { Button, Dialog, DialogTitle, DialogContent, Box, Rating } from "@mui/material";
import { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import { Movie, TVShow } from "../services/TMDB";

const RatingDialog = ({ watchable, onRating, currentRating }: { watchable: Movie | TVShow, onRating: (rating: number) => void, currentRating: number }) => {
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);

  const watchableName = () => (watchable as Movie).title || (watchable as TVShow).name;

  const onRatingDoalogOpen = () => {
    setIsRatingDialogOpen(true);
  };

  const onRatingDialogClose = () => {
    setIsRatingDialogOpen(false);
  };

  return (
    <div>
      <Button size="small" onClick={onRatingDoalogOpen}>
        <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
      </Button>
      <Dialog
        open={isRatingDialogOpen}
        onClose={onRatingDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {watchableName()}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name="hover-feedback"
              value={currentRating || 0}
              precision={0.5}
              onChange={(event, newValue) => {
                if (newValue) {
                  onRating(newValue);
                }
                onRatingDialogClose();
              }}
              // onChangeActive={(event, newHover) => {
              //   setHover(newHover);
              // }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RatingDialog;
