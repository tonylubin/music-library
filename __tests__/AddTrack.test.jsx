import AddTrack from "@/pages/addTrack";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, describe, vi } from "vitest";
import mockdata from '../database/mockdata.json';
import FormStep2 from "@/components/FormStep2";
import FormStep3 from "@/components/FormStep3";
import FormStep4 from "@/components/FormStep4";
import * as mockfuncs from "@/utils/utils";


const user = userEvent.setup();

const setup = () => render(<AddTrack />);

describe("Adding music page", () => {

  test("should render 4 multi-step form links", () => {
    setup();
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(4);
  });

  test("when selected tab(Audio) is clicked it renders correct form step", async () => {
    setup();
    const audioTab = screen.getByRole('tab', {name: 'Audio'});
    await user.click(audioTab);
    const audioInput = await screen.findByLabelText("Audio Track");
    expect(audioInput).toBeInTheDocument();
    expect(audioTab).toHaveAttribute('aria-selected','true');
  });

});

describe("Form step 1 - details", () => {

  const { title, artist, album, year } = mockdata[0];

  test("should render title input & correct value", async () => {
    setup();
    const titleInput = screen.getByLabelText('Title');
    await user.type(titleInput, title);
    expect(titleInput).toHaveValue("treat me right");
  });

  test("should render artist input & correct value", async () => {
    setup();
    const artistInput = screen.getByLabelText('Artist');
    await user.type(artistInput, artist);
    expect(artistInput).toHaveValue("kim english");
  });

  test("should render year input & correct value", async () => {
    setup();
    const yearInput = screen.getByLabelText('Year');
    await user.type(yearInput, year.toString());
    expect(yearInput).toHaveValue('2002');
  });

  test("should render album input & correct value", () => {
    setup();
    const albumInput = screen.getByLabelText('Album');
    expect(albumInput).toHaveValue(album);
  });

  test("should render validation error message for 3 no valid inputs", async () => {
    setup();
    const btn = screen.getByRole("button", { name: 'Next'});
    await user.click(btn);
    const errorMsgs = await screen.findAllByRole("alert");
    expect(errorMsgs).toHaveLength(3);
  });

  test("year input shows error message if not 4 digits & removed when valid", async () => {
    setup();
    const yearInput = screen.getByLabelText('Year');
    await user.type(yearInput, '200');
    const btn = screen.getByRole("button", { name: 'Next'});
    await user.click(btn);
    const yearErrorMsg = await screen.findByText('Year must be exactly 4 digits');
    expect(yearErrorMsg).toBeInTheDocument();
    await user.type(yearInput, '2001');
    expect(yearErrorMsg).not.toBeInTheDocument();
  });

  test("form step (1) is valid and proceeds to next multi-step form (2)", async () => {
    setup();
    const titleInput = screen.getByLabelText('Title');
    await user.type(titleInput, title);
    const artistInput = screen.getByLabelText('Artist');
    await user.type(artistInput, artist);
    const yearInput = screen.getByLabelText('Year');
    await user.type(yearInput, year.toString());
    const btn = screen.getByRole("button", { name: 'Next'});
    await user.click(btn);
    const durationInput = await screen.findByLabelText('Duration');
    expect(durationInput).toBeInTheDocument();
  })

});

describe("form step 2 - genre/time", () => {

  const setup = () => render(<FormStep2 />);

  test("renders duration input with type of 'time'", () => {
    setup();
    const durationInput = screen.getByLabelText('Duration');
    expect(durationInput).toHaveAttribute('type', 'time');
  });

  test("renders select options and default value as a label selected", () => {
    setup();
    const select = screen.getByRole("combobox");
    expect(select).toHaveDisplayValue("-- Please select an option --");
  })

  test("select has 8 options (includes option as a label)", () => {
    setup();
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(8);
  });

  test("selected option should display value", async () => {
    setup();
    const selectedOption = screen.getByRole("combobox");
    await user.selectOptions(selectedOption, 'POP');
    const select = screen.getByRole("combobox");
    expect(select).toHaveDisplayValue("POP");
  });

  test("genre display error message when form invalid", async () => {
    setup();
    const btn = screen.getByRole("button", {name: 'Next'});
    await user.click(btn);
    const errors = await screen.findAllByRole("alert");
    expect(errors).toHaveLength(2);
    const errorMsg = await screen.findByText("Please select a music genre");
    expect(errorMsg).toBeInTheDocument();
  });

});

describe("form step 3 - image", () => {

  const setup = () => render(<FormStep3 />);

  test("renders default image", () => {
    setup();
    const img = screen.getByAltText("vinyl cover");
    expect(img).toBeInTheDocument();
  });

  test("cloudinary widget renders & opens when clicked", async () => {
    setup();
    const uploadBtn = screen.getByRole("button", {name: 'Upload'});
    expect(uploadBtn).toBeInTheDocument();
  });

});

describe("from step 4 - audio", () => {

  const data = {
    title: "treat me right",
    artist: "kim english",
    album: "n/a",
    duration: "05:02",
    genre: "house",
    image_url: "vinyl-library-app/images/ecanzyejmqullrepmngx",
    year: 2002,
  };
  const audioUrl = "https://res.cloudinary.com/dglaifd7o/video/upload/v1692797667/vinyl-library-app/audio/02_Treat_Me_Right_dc8w7z.m4a";

  test("renders audio input", () => {
    render(<FormStep4 />);
    const audioInput = screen.getByLabelText('Audio Track');
    expect(audioInput).toBeInTheDocument();
  });
  
  test("form successfully submitted & success toast called with returned message", async () => {
    let msg = (
      <p>
        The track{" "}
        <span className="underline underline-offset-2 decoration-2 decoration-green-600">
          TREAT ME RIGHT
        </span>{" "}
        by{" "}
        <span className="underline underline-offset-2 decoration-2 decoration-green-600">
          KIM ENGLISH
        </span>{" "}
        was added!
      </p>
    );
    const toast = vi.spyOn(mockfuncs, 'successNotification');
    render(<FormStep4 formData={data} />);
    const audioInput = screen.getByLabelText('Audio Track');
    await user.type(audioInput, audioUrl);
    const submitBtn = screen.getByRole("button", {name: 'Submit'});
    await user.click(submitBtn);
    expect(toast).toHaveBeenCalledWith(msg);
  });

});