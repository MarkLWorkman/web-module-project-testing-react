import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Show from "./../Show";

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

test("renders testShow and no selected Season without errors", () => {
  render(<Show show={testShow} selectedSeason={"none"} />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} selectedSeason={"none"} />);
  const loading = screen.queryByTestId("loading-container");
  expect(loading).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={testShow} selectedSeason={"none"} />);
  const seasons = screen.getAllByTestId("season-option");
  expect(seasons).toHaveLength(testShow.seasons.length);
});

test("handleSelect is called when an season is selected", () => {
  const fakeHandleSelect = jest.fn();
  render(
    <Show
      show={testShow}
      selectedSeason={"none"}
      handleSelect={fakeHandleSelect}
    />
  );
  const select = screen.queryByLabelText("Select A Season");
  userEvent.selectOptions(select, ["1"]);
  expect(fakeHandleSelect).toHaveBeenCalledTimes(1);
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  const { rerender } = render(<Show show={testShow} selectedSeason={"none"} />);
  expect(screen.queryByTestId("episodes-container")).not.toBeInTheDocument();
  rerender(<Show show={testShow} selectedSeason={"0"} />);
  expect(screen.queryByTestId("episodes-container")).toBeInTheDocument();
});
