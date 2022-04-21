import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import * as React from 'react'
import styled from 'styled-components'

export interface AccordionsProp {
    summary: string
    content: JSX.Element
}

export interface Props {
    bigSummary?: boolean
    noBorders?: boolean
    containerProps?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >
    openFirst?: boolean
    accordions: AccordionsProp[]
}

const BigSummary = styled.h1`
    color: slategray;
    font-weight: 100;
    padding: 0;
    margin: 0;
`

const SmallSummary = styled.p`
    color: slategray;
    font-weight: 100;
    padding: 0;
    margin: 0;
`

export function Accordions({
    bigSummary = false,
    noBorders,
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
                    style={noBorders ? { boxShadow: 'none' } : {}}
                    key={item.summary}
                    expanded={expanded === i}
                    onChange={handleChange(i)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${i + 1}a-content`}
                        id={`panel${i + 1}a-header`}
                    >
                        {bigSummary ? (
                            <BigSummary>{item.summary}</BigSummary>
                        ) : (
                            <SmallSummary>{item.summary}</SmallSummary>
                        )}
                    </AccordionSummary>
                    <AccordionDetails>{item.content}</AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}
