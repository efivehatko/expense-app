import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export interface AccordionsProp {
    summary: string
    content: JSX.Element
}

export interface Props {
    containerProps?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >
    openFirst?: boolean
    accordions: AccordionsProp[]
}

export function Accordions({
    accordions,
    containerProps,
    openFirst,
}: Props): JSX.Element | null {
    const [expanded, setExpanded] = React.useState<number | false>(false)

    React.useEffect(() => {
        setExpanded(openFirst ? 0 : false)
    }, [openFirst])

    if (!accordions.length) {
        return null
    }

    const handleChange =
        (panelIndex: number) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panelIndex : false)
        }

    return (
        <div {...containerProps}>
            {accordions.map((item, i) => (
                <Accordion
                    key={item.summary}
                    expanded={expanded === i}
                    onChange={handleChange(i)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${i + 1}a-content`}
                        id={`panel${i + 1}a-header`}
                    >
                        <Typography>{item.summary}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{item.content}</AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}
