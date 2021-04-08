import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../Display";

const testShow = {
  name: "Stranger Things",
  image: {
    medium:
      "https://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
    original:
      "https://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg",
  },
  summary:
    "A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.",
  seasons: [
    {
      id: 0,
      name: "Season 1",
      episodes: [],
    },
    {
      id: 1,
      name: "Season 2",
      episodes: [],
    },
    {
      id: 2,
      name: "Season 3",
      episodes: [],
    },
    {
      id: 3,
      name: "Season 4",
      episodes: [],
    },
  ],
};

test("Display renders without error", () => {
  render(<Display />);
});

test("data fetching works", () => {
  render(<Display show={testShow} />);
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  const showTest = screen.queryByTestId("show-container");
  waitFor(() => expect(showTest).toBeInTheDocument());
});

test("Number of Seasons work", () => {
  render(<Display show={testShow} />);
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  waitFor(() =>
    expect(screen.getAllByTestId("season-option")).toHaveLength(
      testShow.seasons.length
    )
  );
});

test("Other function test", () => {
  const testClick = jest.fn();
  render(<Display handleClick={testClick} />);
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  waitFor(() => expect(testClick).toHaveBeenCalledTimes(1));
});
