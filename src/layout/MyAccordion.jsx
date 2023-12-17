import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowForward } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<IoIosArrowForward />} {...props} />
))(({ theme }) => ({
  backgroundColor: "#DBD8FD",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  "@media (max-width: 640px)": {
    padding: theme.spacing(0.25),
  },
}));

const topics = [
  { title: "Chuyên ngành" },
  { title: "Đại cương" },
  { title: "Khác" },
];

export default function MyAccordion() {
  const [expanded, setExpanded] = React.useState("panel1");
  const [selectedTopics, setSelectedTopics] = React.useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSelectTopic = (topic) => {
    if (!selectedTopics.includes(topic)) {
      setSelectedTopics([...selectedTopics, topic]);
    } else {
      const selectedTopicsCopy = [...selectedTopics];
      const i = selectedTopicsCopy.findIndex((el) => el === topic);
      selectedTopicsCopy.splice(i, 1);
      setSelectedTopics(selectedTopicsCopy);
    }
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="flex gap-2 items-center text-lg font-bold">
            <span className="">
              <FaBookOpen />
            </span>
            <span className="hidden md:block">Chủ đề</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-1">
            {topics.map((t) => (
              <div
                className="cursor-pointer py-2 hover:bg-gray-200 rounded-lg px-4 transition-all flex justify-between items-center"
                key={t.title}
                onClick={() => handleSelectTopic(t.title)}
              >
                <span className="text-xs md:text-sm lg:text-base">{t.title}</span>
                {selectedTopics.includes(t.title) ? (
                  <span className="text-green-500">
                    <FaCircleCheck />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
