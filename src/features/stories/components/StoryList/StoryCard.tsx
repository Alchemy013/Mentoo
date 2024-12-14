import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdThumbUp, MdShare } from "react-icons/md";
import { useAuth } from "../../../auth/context/AuthContext";
import { ShareButton } from "./ShareButton";
import type { Story } from "../../types";

interface Props {
  story: Story;
  onLike: (storyId: string) => void;
}

export function StoryCard({ story, onLike }: Props) {
  const { user } = useAuth();

  const handleLike = () => {
    if (story.liked) {
      return;
    }
    onLike(story.id);
  };

  const getLikeButtonTooltip = () => {
    if (!user) return "Sign in to like stories";
    if (story.liked) return "You have already liked this story";
    return "Like this story";
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {story.title}
        </Typography>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            By {story.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • {story.date}
          </Typography>
          <Chip label={story.category} size="small" />
          <Box
            sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Tooltip title={getLikeButtonTooltip()}>
                <span>
                  <IconButton
                    onClick={handleLike}
                    color={story.liked ? "primary" : "default"}
                    size="small"
                    disabled={!user || story.liked}
                    sx={{
                      "&:hover": {
                        backgroundColor: story.liked
                          ? "primary.light"
                          : "action.hover",
                      },
                    }}
                  >
                    <MdThumbUp />
                  </IconButton>
                </span>
              </Tooltip>
              <Typography
                variant="body2"
                color={story.liked ? "primary.main" : "text.secondary"}
                sx={{
                  minWidth: "20px",
                  fontWeight: story.liked ? 600 : 400,
                }}
              >
                {story.likes || 0}
              </Typography>
            </Box>
            <ShareButton title={story.title} content={story.content} />
          </Box>
        </Box>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
          {story.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
