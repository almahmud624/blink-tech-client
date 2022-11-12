import React from "react";
import SectionTitle from "../../Component/SectionTitle";
import TitleHighlighter from "../../Component/TitleHighlighter";
import TestimonalCard from "./TestimonalCard";

const Testimonials = () => {
  const testimonials = [
    {
      _id: 1,
      name: "Robert Z",
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      reviewText:
        "Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",

      role: "Head of marketing at Resnet",
    },
    {
      _id: 2,
      name: "Leio McLaren",
      img: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
      reviewText:
        "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada.",

      role: "Senior Developer",
    },
    {
      _id: 3,
      name: "Alex Supran",
      img: "https://images.unsplash.com/photo-1628890920690-9e29d0019b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      reviewText:
        "Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

      role: "Head of Manager at Deterset",
    },
  ];
  return (
    <div className="pb-20">
      <TitleHighlighter>Testimonials</TitleHighlighter>
      <SectionTitle>Beloved Feedback</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 mt-10">
        {testimonials?.map((testimonial) => (
          <TestimonalCard
            key={Math.random()}
            testimonial={testimonial}
          ></TestimonalCard>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
