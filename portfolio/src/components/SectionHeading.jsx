import Reveal from './Reveal.jsx'

// Small label + optional serif lead, sitting in the section's left column.
export default function SectionHeading({ label, lead }) {
  return (
    <Reveal className="section-heading">
      <h2 className="label">{label}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  )
}
