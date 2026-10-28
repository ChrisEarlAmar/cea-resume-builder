import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import type { Certification, Education, Experience, Project, ResumeData, ResumeTemplateId, SkillGroup } from '../../types/resume'
import { formatDateRange, formatUrlLabel, toHttpUrl } from '../../utils/resumeHelpers'

interface PDFResumeDocumentProps {
  data: ResumeData
  template?: ResumeTemplateId
}

const mm = (value: number): number => value * 2.83465

const styles = StyleSheet.create({
  page: {
    paddingTop: mm(15),
    paddingRight: mm(16),
    paddingBottom: mm(12),
    paddingLeft: mm(16),
    color: '#111111',
    fontFamily: 'Helvetica',
    fontSize: 10.1,
    lineHeight: 1.52,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: mm(6),
  },
  identity: {
    flexGrow: 1,
    paddingRight: mm(10),
  },
  name: {
    marginBottom: mm(3),
    fontFamily: 'Helvetica-Bold',
    fontSize: 26,
    lineHeight: 0.98,
  },
  title: {
    marginBottom: mm(4.5),
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.2,
    letterSpacing: 1.3,
    lineHeight: 1.2,
    textTransform: 'uppercase',
  },
  rule: {
    width: mm(42),
    height: 1.2,
    backgroundColor: '#111111',
  },
  contact: {
    width: mm(60),
    color: '#111111',
    fontSize: 8.5,
    lineHeight: 1.55,
    textAlign: 'right',
  },
  contactLink: {
    color: '#111111',
    textDecoration: 'underline',
  },
  section: {
    flexDirection: 'row',
    marginTop: mm(5),
  },
  firstSection: {
    marginTop: 0,
  },
  sectionLabel: {
    width: mm(29),
    marginRight: mm(7),
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.2,
    letterSpacing: 1.3,
    lineHeight: 1.2,
    textTransform: 'uppercase',
  },
  sectionContent: {
    flex: 1,
  },
  summary: {
    fontSize: 10.1,
    lineHeight: 1.52,
  },
  entries: {
    gap: mm(3.8),
  },
  entry: {
    flexDirection: 'row',
  },
  rail: {
    width: mm(26),
    marginRight: mm(5),
    color: '#3e3e3e',
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.2,
    letterSpacing: 0.45,
    lineHeight: 1.32,
    textTransform: 'uppercase',
  },
  entryBody: {
    flex: 1,
  },
  entryTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  entryTitle: {
    marginBottom: mm(1.3),
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.8,
    lineHeight: 1.25,
  },
  entryMeta: {
    marginBottom: mm(2),
    color: '#454545',
    fontSize: 9.3,
    lineHeight: 1.35,
  },
  description: {
    fontSize: 8.9,
    lineHeight: 1.45,
  },
  highlights: {
    gap: mm(1.2),
  },
  highlight: {
    flexDirection: 'row',
  },
  marker: {
    width: mm(4),
    fontSize: 8.9,
    lineHeight: 1.45,
  },
  highlightText: {
    flex: 1,
    fontSize: 8.9,
    lineHeight: 1.45,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: mm(4),
  },
  skillGroup: {
    width: '50%',
    paddingRight: mm(7),
  },
  skillTitle: {
    marginBottom: mm(1.1),
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    lineHeight: 1.32,
  },
  skillList: {
    fontSize: 8.8,
    lineHeight: 1.42,
  },
  stack: {
    marginTop: mm(2.1),
    fontSize: 8.6,
    lineHeight: 1.42,
  },
  stackLabel: {
    fontFamily: 'Helvetica-Bold',
  },
  inlineLink: {
    marginLeft: mm(2.5),
    color: '#454545',
    fontSize: 7.8,
    textDecoration: 'underline',
  },
  classicPage: {
    paddingTop: mm(14),
    paddingRight: mm(18),
    paddingBottom: mm(13),
    paddingLeft: mm(18),
  },
  compactPage: {
    paddingTop: mm(12),
    paddingRight: mm(13),
    paddingBottom: mm(10),
    paddingLeft: mm(13),
    fontSize: 9.4,
    lineHeight: 1.42,
  },
  sidebarPage: {
    paddingTop: mm(14),
    paddingRight: mm(14),
    paddingBottom: mm(12),
    paddingLeft: mm(14),
  },
  minimalPage: {
    paddingTop: mm(17),
    paddingRight: mm(19),
    paddingBottom: mm(14),
    paddingLeft: mm(19),
  },
  classicHeader: {
    paddingBottom: mm(5),
    borderBottomWidth: 1.1,
    borderBottomColor: '#111111',
  },
  sidebarHeader: {
    paddingBottom: mm(5),
    borderBottomWidth: 1.1,
    borderBottomColor: '#111111',
  },
  compactHeader: {
    marginBottom: mm(4),
  },
  compactName: {
    marginBottom: mm(2),
    fontSize: 23,
  },
  compactTitle: {
    marginBottom: mm(3),
    fontSize: 8.2,
  },
  compactContact: {
    width: mm(54),
    fontSize: 7.7,
    lineHeight: 1.45,
  },
  compactIdentity: {
    paddingRight: mm(7),
  },
  minimalHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: mm(4),
    paddingBottom: mm(6),
    borderBottomWidth: 0.8,
    borderBottomColor: '#969690',
  },
  minimalIdentity: {
    paddingRight: 0,
    alignItems: 'center',
  },
  minimalName: {
    marginBottom: mm(2),
    fontSize: 25,
    textAlign: 'center',
  },
  minimalTitle: {
    marginBottom: mm(2.5),
    textAlign: 'center',
  },
  minimalRule: {
    width: mm(24),
  },
  minimalContact: {
    width: '100%',
    marginTop: mm(3),
    textAlign: 'center',
  },
  classicRule: {
    height: 0,
    backgroundColor: '#ffffff',
  },
  sidebarRule: {
    width: mm(30),
    height: 0.8,
  },
  stackedSection: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: mm(5),
  },
  stackedFirstSection: {
    marginTop: mm(5),
  },
  classicSection: {
    paddingTop: mm(3),
    borderTopWidth: 0.7,
    borderTopColor: '#a7a7a1',
  },
  compactSection: {
    marginTop: mm(4.2),
  },
  compactFirstSection: {
    marginTop: mm(5),
  },
  stackedSectionLabel: {
    width: 'auto',
    marginRight: 0,
    marginBottom: mm(2.4),
    fontSize: 8.4,
    letterSpacing: 1.1,
  },
  compactSectionLabel: {
    width: mm(25),
    marginRight: mm(5),
    fontSize: 7.6,
  },
  compactSummary: {
    fontSize: 9.4,
    lineHeight: 1.42,
  },
  compactEntries: {
    gap: mm(3.4),
  },
  compactEntry: {
    gap: mm(3.5),
  },
  compactRail: {
    width: mm(21),
    marginRight: 0,
    fontSize: 7.4,
  },
  compactEntryTitle: {
    marginBottom: mm(0.9),
    fontSize: 9.8,
  },
  compactEntryMeta: {
    marginBottom: mm(1.5),
    fontSize: 8.4,
  },
  compactDescription: {
    fontSize: 8.05,
    lineHeight: 1.36,
  },
  compactHighlights: {
    gap: mm(0.7),
  },
  compactStack: {
    marginTop: mm(1.5),
    fontSize: 7.8,
  },
  compactSkills: {
    rowGap: mm(2.2),
  },
  compactSkillGroup: {
    width: '100%',
  },
  compactSkillTitle: {
    marginBottom: mm(0.6),
    fontSize: 7.8,
  },
  compactSkillList: {
    fontSize: 7.8,
    lineHeight: 1.34,
  },
  classicEntry: {
    flexDirection: 'row',
  },
  classicBody: {
    marginRight: mm(5),
  },
  classicRail: {
    width: mm(32),
    marginRight: 0,
    textAlign: 'right',
  },
  minimalEntry: {
    flexDirection: 'column',
    gap: mm(1.2),
  },
  minimalRail: {
    width: 'auto',
    marginRight: 0,
    fontSize: 7.8,
  },
  sidebarLayout: {
    flexDirection: 'row',
    marginTop: mm(6),
  },
  sidebarFirstSection: {
    marginTop: 0,
  },
  sidebarAside: {
    width: mm(43),
    marginRight: mm(8),
    paddingRight: mm(5),
    borderRightWidth: 0.7,
    borderRightColor: '#afafa9',
  },
  sidebarMain: {
    flex: 1,
  },
  sidebarEntry: {
    flexDirection: 'column',
    gap: mm(0.8),
  },
  sidebarRail: {
    width: 'auto',
    marginRight: 0,
    fontSize: 7.4,
  },
  sidebarEntryTitle: {
    fontSize: 9.1,
  },
  sidebarEntryMeta: {
    marginBottom: mm(1.5),
    fontSize: 8.2,
  },
  sidebarDescription: {
    fontSize: 8,
    lineHeight: 1.37,
  },
  sidebarSkills: {
    flexDirection: 'column',
    rowGap: mm(3),
  },
  sidebarSkillGroup: {
    width: '100%',
    paddingRight: 0,
  },
  sidebarSkillTitle: {
    marginBottom: mm(0.7),
    fontSize: 8.1,
  },
  sidebarSkillList: {
    fontSize: 8,
    lineHeight: 1.38,
  },
  atsPage: {
    paddingTop: mm(15),
    paddingRight: mm(16),
    paddingBottom: mm(13),
    paddingLeft: mm(16),
    fontSize: 9.7,
    lineHeight: 1.4,
  },
  atsHeader: {
    paddingBottom: mm(4),
    borderBottomWidth: 1,
    borderBottomColor: '#111111',
  },
  atsName: {
    marginBottom: mm(1.6),
    fontFamily: 'Helvetica-Bold',
    fontSize: 23,
    lineHeight: 1,
  },
  atsTitle: {
    marginBottom: mm(1.8),
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    lineHeight: 1.25,
  },
  atsContact: {
    marginBottom: mm(1),
    fontSize: 9.2,
    lineHeight: 1.35,
  },
  atsLink: {
    marginBottom: mm(0.9),
    fontSize: 8.8,
    lineHeight: 1.35,
    textDecoration: 'underline',
  },
  atsSection: {
    marginTop: mm(4.2),
  },
  atsSectionTitle: {
    marginBottom: mm(1.6),
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.2,
    lineHeight: 1.2,
  },
  atsEntry: {
    marginTop: mm(2.5),
  },
  atsFirstEntry: {
    marginTop: 0,
  },
  atsEntryTitle: {
    marginBottom: mm(0.8),
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.1,
    lineHeight: 1.25,
  },
  atsMeta: {
    marginBottom: mm(0.9),
    color: '#333333',
    fontSize: 9.2,
    lineHeight: 1.35,
  },
  atsBody: {
    marginBottom: mm(0.9),
    fontSize: 9.2,
    lineHeight: 1.38,
  },
  atsHighlights: {
    marginTop: mm(1.2),
    gap: mm(0.7),
  },
  atsHighlight: {
    flexDirection: 'row',
  },
  atsMarker: {
    width: mm(4),
    fontSize: 9.2,
    lineHeight: 1.38,
  },
  atsHighlightText: {
    flex: 1,
    fontSize: 9.2,
    lineHeight: 1.38,
  },
  atsSkills: {
    gap: mm(1.1),
  },
})

const hasExperienceContent = (item: Experience): boolean => Boolean(
  item.position.trim() || item.company.trim() || item.location.trim() || item.highlights.some((highlight) => highlight.trim()),
)

const hasEducationContent = (item: Education): boolean => Boolean(
  item.institution.trim() || item.degree.trim() || item.field.trim() || item.description.trim(),
)

const hasProjectContent = (item: Project): boolean => Boolean(
  item.name.trim() || item.description.trim() || item.technologies.some((technology) => technology.trim()),
)

const hasCertificationContent = (item: Certification): boolean => Boolean(
  item.name.trim() || item.issuer.trim() || item.date.trim(),
)

const formatPdfDateRange = (startDate: string, endDate: string, current = false): string => {
  const range = formatDateRange(startDate, endDate, current)
  return range.length > 13 ? range.replace(' - ', '\n') : range
}

const keepEntryTogether = (parts: string[], limit = 850): boolean =>
  parts.join(' ').length <= limit

interface SectionProps {
  label: string
  children: React.ReactNode
  first?: boolean
  template: ResumeTemplateId
}

const PDFSection = ({ label, children, first = false, template }: SectionProps) => {
  const stacked = template === 'classic' || template === 'sidebar' || template === 'minimal'
  return (
  <View
    style={[
      styles.section,
      first ? styles.firstSection : undefined,
      stacked ? styles.stackedSection : undefined,
      stacked && first ? styles.stackedFirstSection : undefined,
      template === 'classic' ? styles.classicSection : undefined,
      template === 'compact' ? styles.compactSection : undefined,
      template === 'compact' && first ? styles.compactFirstSection : undefined,
    ]}
  >
    <Text style={[
      styles.sectionLabel,
      stacked ? styles.stackedSectionLabel : undefined,
      template === 'compact' ? styles.compactSectionLabel : undefined,
    ]}>{label}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
  )
}

const PDFHeader = ({ data, template }: { data: ResumeData, template: ResumeTemplateId }) => {
  const contactDetails = [data.personal.email, data.personal.phone, data.personal.location].filter(Boolean)
  const links = [data.personal.linkedin, data.personal.github, data.personal.website].filter(Boolean)
  return (
    <View style={[
      styles.header,
      template === 'classic' ? styles.classicHeader : undefined,
      template === 'compact' ? styles.compactHeader : undefined,
      template === 'sidebar' ? styles.sidebarHeader : undefined,
      template === 'minimal' ? styles.minimalHeader : undefined,
    ]}>
      <View style={[
        styles.identity,
        template === 'compact' ? styles.compactIdentity : undefined,
        template === 'minimal' ? styles.minimalIdentity : undefined,
      ]}>
        {data.personal.name ? <Text style={[styles.name, template === 'compact' ? styles.compactName : undefined, template === 'minimal' ? styles.minimalName : undefined]}>{data.personal.name}</Text> : null}
        {data.personal.title ? <Text style={[styles.title, template === 'compact' ? styles.compactTitle : undefined, template === 'minimal' ? styles.minimalTitle : undefined]}>{data.personal.title}</Text> : null}
        <View style={[
          styles.rule,
          template === 'classic' ? styles.classicRule : undefined,
          template === 'sidebar' ? styles.sidebarRule : undefined,
          template === 'minimal' ? styles.minimalRule : undefined,
        ]} />
      </View>
      {(contactDetails.length > 0 || links.length > 0) ? (
        <View style={[
          styles.contact,
          template === 'compact' ? styles.compactContact : undefined,
          template === 'minimal' ? styles.minimalContact : undefined,
        ]}>
          {contactDetails.map((detail) => <Text key={detail}>{detail}</Text>)}
          {links.map((value) => {
            const url = toHttpUrl(value)
            const label = formatUrlLabel(value)
            return url ? <Link key={value} src={url} style={styles.contactLink}>{label}</Link> : <Text key={value}>{label}</Text>
          })}
        </View>
      ) : null}
    </View>
  )
}

const PDFAtsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View style={styles.atsSection}>
    <Text style={styles.atsSectionTitle}>{title}</Text>
    {children}
  </View>
)

const PDFAtsHeader = ({ data }: { data: ResumeData }) => {
  const contactDetails = [data.personal.email, data.personal.phone, data.personal.location].filter(Boolean)
  const links = [data.personal.linkedin, data.personal.github, data.personal.website].filter(Boolean)

  return (
    <View style={styles.atsHeader}>
      {data.personal.name ? <Text style={styles.atsName}>{data.personal.name}</Text> : null}
      {data.personal.title ? <Text style={styles.atsTitle}>{data.personal.title}</Text> : null}
      {contactDetails.length > 0 ? <Text style={styles.atsContact}>{contactDetails.join(' | ')}</Text> : null}
      {links.map((value) => {
        const url = toHttpUrl(value)
        const label = formatUrlLabel(value)
        return url ? <Link key={value} src={url} style={styles.atsLink}>{label}</Link> : <Text key={value} style={styles.atsLink}>{label}</Text>
      })}
    </View>
  )
}

const PDFAtsExperience = ({ items }: { items: Experience[] }) => {
  const experience = items.filter(hasExperienceContent)
  if (experience.length === 0) return null

  return (
    <PDFAtsSection title="Experience">
      {experience.map((item, itemIndex) => {
        const meta = [item.company, item.location, formatDateRange(item.startDate, item.endDate, item.current)].filter(Boolean)
        const highlights = item.highlights.filter((highlight) => highlight.trim())
        return (
          <View key={item.id} style={[styles.atsEntry, itemIndex === 0 ? styles.atsFirstEntry : undefined]} wrap={!keepEntryTogether([item.position, ...meta, ...highlights])}>
            {item.position ? <Text style={styles.atsEntryTitle}>{item.position}</Text> : null}
            {meta.length > 0 ? <Text style={styles.atsMeta}>{meta.join(' | ')}</Text> : null}
            {highlights.length > 0 ? (
              <View style={styles.atsHighlights}>
                {highlights.map((highlight, index) => (
                  <View style={styles.atsHighlight} key={`${item.id}-${index}`}>
                    <Text style={styles.atsMarker}>-</Text>
                    <Text style={styles.atsHighlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        )
      })}
    </PDFAtsSection>
  )
}

const PDFAtsEducation = ({ items }: { items: Education[] }) => {
  const education = items.filter(hasEducationContent)
  if (education.length === 0) return null

  return (
    <PDFAtsSection title="Education">
      {education.map((item, itemIndex) => {
        const degree = [item.degree, item.field].filter(Boolean).join(', ')
        const meta = [item.institution, formatDateRange(item.startDate, item.endDate)].filter(Boolean)
        return (
          <View key={item.id} style={[styles.atsEntry, itemIndex === 0 ? styles.atsFirstEntry : undefined]} wrap={!keepEntryTogether([degree, ...meta, item.description])}>
            {degree ? <Text style={styles.atsEntryTitle}>{degree}</Text> : null}
            {meta.length > 0 ? <Text style={styles.atsMeta}>{meta.join(' | ')}</Text> : null}
            {item.description ? <Text style={styles.atsBody}>{item.description}</Text> : null}
          </View>
        )
      })}
    </PDFAtsSection>
  )
}

const PDFAtsSkills = ({ items }: { items: SkillGroup[] }) => {
  const groups = items
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skill.trim()) }))
    .filter((group) => group.skills.length > 0)
  if (groups.length === 0) return null

  return (
    <PDFAtsSection title="Skills">
      <View style={styles.atsSkills}>
        {groups.map((group) => (
          <Text key={group.id} style={styles.atsBody}>
            {group.name ? <Text style={styles.stackLabel}>{group.name}: </Text> : null}
            {group.skills.join(', ')}
          </Text>
        ))}
      </View>
    </PDFAtsSection>
  )
}

const PDFAtsProjects = ({ items }: { items: Project[] }) => {
  const projects = items.filter(hasProjectContent)
  if (projects.length === 0) return null

  return (
    <PDFAtsSection title="Projects">
      {projects.map((project, itemIndex) => {
        const link = toHttpUrl(project.link)
        const linkLabel = formatUrlLabel(project.link)
        const technologies = project.technologies.filter((technology) => technology.trim())
        return (
          <View key={project.id} style={[styles.atsEntry, itemIndex === 0 ? styles.atsFirstEntry : undefined]} wrap={!keepEntryTogether([project.name, project.description, ...technologies])}>
            {project.name ? <Text style={styles.atsEntryTitle}>{project.name}</Text> : null}
            {link ? <Link src={link} style={styles.atsLink}>{linkLabel}</Link> : null}
            {project.description ? <Text style={styles.atsBody}>{project.description}</Text> : null}
            {technologies.length > 0 ? <Text style={styles.atsBody}><Text style={styles.stackLabel}>Technologies: </Text>{technologies.join(', ')}</Text> : null}
          </View>
        )
      })}
    </PDFAtsSection>
  )
}

const PDFAtsCertifications = ({ items }: { items: Certification[] }) => {
  const certifications = items.filter(hasCertificationContent)
  if (certifications.length === 0) return null

  return (
    <PDFAtsSection title="Certifications">
      {certifications.map((item, itemIndex) => {
        const meta = [item.issuer, item.date].filter(Boolean)
        const url = toHttpUrl(item.url)
        return (
          <View key={item.id} style={[styles.atsEntry, itemIndex === 0 ? styles.atsFirstEntry : undefined]} wrap={!keepEntryTogether([item.name, ...meta, item.url])}>
            {item.name ? <Text style={styles.atsEntryTitle}>{item.name}</Text> : null}
            {meta.length > 0 ? <Text style={styles.atsMeta}>{meta.join(' | ')}</Text> : null}
            {url ? <Link src={url} style={styles.atsLink}>{formatUrlLabel(item.url)}</Link> : null}
          </View>
        )
      })}
    </PDFAtsSection>
  )
}

const PDFAtsContent = ({ data }: { data: ResumeData }) => (
  <>
    {data.summary.trim() ? <PDFAtsSection title="Professional Summary"><Text style={styles.atsBody}>{data.summary}</Text></PDFAtsSection> : null}
    <PDFAtsExperience items={data.experience} />
    <PDFAtsEducation items={data.education} />
    <PDFAtsSkills items={data.skillGroups} />
    <PDFAtsProjects items={data.projects} />
    <PDFAtsCertifications items={data.certifications} />
  </>
)

const PDFExperience = ({ items, template }: { items: Experience[], template: ResumeTemplateId }) => {
  const experience = items.filter(hasExperienceContent)
  if (experience.length === 0) return null
  return (
    <PDFSection label="Experience" template={template}>
      <View style={[styles.entries, template === 'compact' ? styles.compactEntries : undefined]}>
        {experience.map((item) => {
          const meta = [item.company, item.location].filter(Boolean).join(' / ')
          const highlights = item.highlights.filter((highlight) => highlight.trim())
          const entryBody = (
            <View style={[
              styles.entryBody,
              template === 'classic' ? styles.classicBody : undefined,
            ]}>
              {item.position ? <Text style={[styles.entryTitle, template === 'compact' ? styles.compactEntryTitle : undefined, template === 'sidebar' ? styles.sidebarEntryTitle : undefined]}>{item.position}</Text> : null}
              {meta ? <Text style={[styles.entryMeta, template === 'compact' ? styles.compactEntryMeta : undefined, template === 'sidebar' ? styles.sidebarEntryMeta : undefined]}>{meta}</Text> : null}
              {highlights.length > 0 ? (
                <View style={[styles.highlights, template === 'compact' ? styles.compactHighlights : undefined]}>
                  {highlights.map((highlight, index) => (
                    <View style={styles.highlight} key={`${item.id}-${index}`}>
                      <Text style={[styles.marker, template === 'compact' ? styles.compactDescription : undefined, template === 'sidebar' ? styles.sidebarDescription : undefined]}>-</Text>
                      <Text style={[styles.highlightText, template === 'compact' ? styles.compactDescription : undefined, template === 'sidebar' ? styles.sidebarDescription : undefined]}>{highlight}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          )
          const rail = <Text style={[
            styles.rail,
            template === 'classic' ? styles.classicRail : undefined,
            template === 'compact' ? styles.compactRail : undefined,
            template === 'sidebar' ? styles.sidebarRail : undefined,
            template === 'minimal' ? styles.minimalRail : undefined,
          ]}>{formatPdfDateRange(item.startDate, item.endDate, item.current)}</Text>
          return (
            <View
              key={item.id}
              style={[
                styles.entry,
                template === 'classic' ? styles.classicEntry : undefined,
                template === 'compact' ? styles.compactEntry : undefined,
                template === 'sidebar' ? styles.sidebarEntry : undefined,
                template === 'minimal' ? styles.minimalEntry : undefined,
              ]}
              wrap={!keepEntryTogether([item.position, item.company, item.location, ...highlights])}
            >
              {template === 'classic' || template === 'sidebar' || template === 'minimal' ? <>{entryBody}{rail}</> : <>{rail}{entryBody}</>}
            </View>
          )
        })}
      </View>
    </PDFSection>
  )
}

const PDFEducation = ({ items, template }: { items: Education[], template: ResumeTemplateId }) => {
  const education = items.filter(hasEducationContent)
  if (education.length === 0) return null
  return (
    <PDFSection label="Education" template={template}>
      <View style={[styles.entries, template === 'compact' ? styles.compactEntries : undefined]}>
        {education.map((item) => {
          const degree = [item.degree, item.field].filter(Boolean).join(', ')
          const entryBody = (
            <View style={[styles.entryBody, template === 'classic' ? styles.classicBody : undefined]}>
              {degree ? <Text style={[styles.entryTitle, template === 'compact' ? styles.compactEntryTitle : undefined, template === 'sidebar' ? styles.sidebarEntryTitle : undefined]}>{degree}</Text> : null}
              {item.institution ? <Text style={[styles.entryMeta, template === 'compact' ? styles.compactEntryMeta : undefined, template === 'sidebar' ? styles.sidebarEntryMeta : undefined]}>{item.institution}</Text> : null}
              {item.description ? <Text style={[styles.description, template === 'compact' ? styles.compactDescription : undefined, template === 'sidebar' ? styles.sidebarDescription : undefined]}>{item.description}</Text> : null}
            </View>
          )
          const rail = <Text style={[
            styles.rail,
            template === 'classic' ? styles.classicRail : undefined,
            template === 'compact' ? styles.compactRail : undefined,
            template === 'sidebar' ? styles.sidebarRail : undefined,
            template === 'minimal' ? styles.minimalRail : undefined,
          ]}>{formatPdfDateRange(item.startDate, item.endDate)}</Text>
          return (
            <View
              key={item.id}
              style={[
                styles.entry,
                template === 'classic' ? styles.classicEntry : undefined,
                template === 'compact' ? styles.compactEntry : undefined,
                template === 'sidebar' ? styles.sidebarEntry : undefined,
                template === 'minimal' ? styles.minimalEntry : undefined,
              ]}
              wrap={!keepEntryTogether([item.degree, item.field, item.institution, item.description])}
            >
              {template === 'classic' || template === 'sidebar' || template === 'minimal' ? <>{entryBody}{rail}</> : <>{rail}{entryBody}</>}
            </View>
          )
        })}
      </View>
    </PDFSection>
  )
}

const PDFSkills = ({ items, template }: { items: SkillGroup[], template: ResumeTemplateId }) => {
  const groups = items
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skill.trim()) }))
    .filter((group) => group.skills.length > 0)
  if (groups.length === 0) return null
  return (
    <PDFSection label="Skills" template={template}>
      <View style={[
        styles.skills,
        template === 'compact' ? styles.compactSkills : undefined,
        template === 'sidebar' ? styles.sidebarSkills : undefined,
      ]}>
        {groups.map((group) => (
          <View key={group.id} style={[
            styles.skillGroup,
            template === 'compact' ? styles.compactSkillGroup : undefined,
            template === 'sidebar' ? styles.sidebarSkillGroup : undefined,
          ]} wrap={false}>
            {group.name ? <Text style={[
              styles.skillTitle,
              template === 'compact' ? styles.compactSkillTitle : undefined,
              template === 'sidebar' ? styles.sidebarSkillTitle : undefined,
            ]}>{group.name}</Text> : null}
            <Text style={[
              styles.skillList,
              template === 'compact' ? styles.compactSkillList : undefined,
              template === 'sidebar' ? styles.sidebarSkillList : undefined,
            ]}>{group.skills.join(', ')}</Text>
          </View>
        ))}
      </View>
    </PDFSection>
  )
}

const PDFProjects = ({ items, template }: { items: Project[], template: ResumeTemplateId }) => {
  const projects = items.filter(hasProjectContent)
  if (projects.length === 0) return null
  return (
    <PDFSection label="Projects" template={template}>
      <View style={[styles.entries, template === 'compact' ? styles.compactEntries : undefined]}>
        {projects.map((project, index) => {
          const link = toHttpUrl(project.link)
          const linkLabel = formatUrlLabel(project.link)
          const technologies = project.technologies.filter((technology) => technology.trim())
          const entryBody = (
            <View style={[styles.entryBody, template === 'classic' ? styles.classicBody : undefined]}>
              {project.name ? (
                <View style={styles.entryTitleRow}>
                  <Text style={[styles.entryTitle, template === 'compact' ? styles.compactEntryTitle : undefined, template === 'sidebar' ? styles.sidebarEntryTitle : undefined]}>{project.name}</Text>
                  {link ? <Link src={link} style={styles.inlineLink}>{linkLabel}</Link> : null}
                </View>
              ) : null}
              {project.description ? <Text style={[styles.description, template === 'compact' ? styles.compactDescription : undefined, template === 'sidebar' ? styles.sidebarDescription : undefined]}>{project.description}</Text> : null}
              {technologies.length > 0 ? <Text style={[styles.stack, template === 'compact' ? styles.compactStack : undefined]}><Text style={styles.stackLabel}>Stack </Text>{technologies.join(', ')}</Text> : null}
            </View>
          )
          const rail = <Text style={[
            styles.rail,
            template === 'classic' ? styles.classicRail : undefined,
            template === 'compact' ? styles.compactRail : undefined,
            template === 'sidebar' ? styles.sidebarRail : undefined,
            template === 'minimal' ? styles.minimalRail : undefined,
          ]}>{String(index + 1).padStart(2, '0')}</Text>
          return (
            <View
              key={project.id}
              style={[
                styles.entry,
                template === 'classic' ? styles.classicEntry : undefined,
                template === 'compact' ? styles.compactEntry : undefined,
                template === 'sidebar' ? styles.sidebarEntry : undefined,
                template === 'minimal' ? styles.minimalEntry : undefined,
              ]}
              wrap={!keepEntryTogether([project.name, project.description, ...technologies])}
            >
              {template === 'classic' || template === 'sidebar' || template === 'minimal' ? <>{entryBody}{rail}</> : <>{rail}{entryBody}</>}
            </View>
          )
        })}
      </View>
    </PDFSection>
  )
}

const PDFCertifications = ({ items, template }: { items: Certification[], template: ResumeTemplateId }) => {
  const certifications = items.filter(hasCertificationContent)
  if (certifications.length === 0) return null
  return (
    <PDFSection label="Credentials" template={template}>
      <View style={[styles.entries, template === 'compact' ? styles.compactEntries : undefined]}>
        {certifications.map((certification) => {
          const url = toHttpUrl(certification.url)
          const entryBody = (
            <View style={[styles.entryBody, template === 'classic' ? styles.classicBody : undefined]}>
              {certification.name ? (
                <View style={styles.entryTitleRow}>
                  <Text style={[styles.entryTitle, template === 'compact' ? styles.compactEntryTitle : undefined, template === 'sidebar' ? styles.sidebarEntryTitle : undefined]}>{certification.name}</Text>
                  {url ? <Link src={url} style={styles.inlineLink}>Verify</Link> : null}
                </View>
              ) : null}
              {certification.issuer ? <Text style={[styles.entryMeta, template === 'compact' ? styles.compactEntryMeta : undefined, template === 'sidebar' ? styles.sidebarEntryMeta : undefined]}>{certification.issuer}</Text> : null}
            </View>
          )
          const rail = <Text style={[
            styles.rail,
            template === 'classic' ? styles.classicRail : undefined,
            template === 'compact' ? styles.compactRail : undefined,
            template === 'sidebar' ? styles.sidebarRail : undefined,
            template === 'minimal' ? styles.minimalRail : undefined,
          ]}>{certification.date}</Text>
          return (
            <View
              key={certification.id}
              style={[
                styles.entry,
                template === 'classic' ? styles.classicEntry : undefined,
                template === 'compact' ? styles.compactEntry : undefined,
                template === 'sidebar' ? styles.sidebarEntry : undefined,
                template === 'minimal' ? styles.minimalEntry : undefined,
              ]}
              wrap={!keepEntryTogether([certification.name, certification.issuer, certification.date])}
            >
              {template === 'classic' || template === 'sidebar' || template === 'minimal' ? <>{entryBody}{rail}</> : <>{rail}{entryBody}</>}
            </View>
          )
        })}
      </View>
    </PDFSection>
  )
}

const PDFSummary = ({ summary, template, first = false }: { summary: string, template: ResumeTemplateId, first?: boolean }) => {
  if (!summary.trim()) return null
  return (
    <PDFSection label="Profile" first={first} template={template}>
      <Text style={[styles.summary, template === 'compact' ? styles.compactSummary : undefined]}>{summary}</Text>
    </PDFSection>
  )
}

const PDFSidebarContent = ({ data }: { data: ResumeData }) => (
  <View style={styles.sidebarLayout}>
    <View style={styles.sidebarAside}>
      <View style={styles.sidebarFirstSection}>
        <PDFSkills items={data.skillGroups} template="sidebar" />
      </View>
      <PDFEducation items={data.education} template="sidebar" />
      <PDFCertifications items={data.certifications} template="sidebar" />
    </View>
    <View style={styles.sidebarMain}>
      <View style={styles.sidebarFirstSection}>
        <PDFSummary summary={data.summary} template="sidebar" />
      </View>
      <PDFExperience items={data.experience} template="sidebar" />
      <PDFProjects items={data.projects} template="sidebar" />
    </View>
  </View>
)

const PDFStandardContent = ({ data, template }: { data: ResumeData, template: ResumeTemplateId }) => (
  <>
    <PDFSummary summary={data.summary} template={template} first />
    <PDFExperience items={data.experience} template={template} />
    {template === 'minimal' ? (
      <>
        <PDFProjects items={data.projects} template={template} />
        <PDFSkills items={data.skillGroups} template={template} />
        <PDFEducation items={data.education} template={template} />
      </>
    ) : (
      <>
        <PDFEducation items={data.education} template={template} />
        <PDFSkills items={data.skillGroups} template={template} />
        <PDFProjects items={data.projects} template={template} />
      </>
    )}
    <PDFCertifications items={data.certifications} template={template} />
  </>
)

export const PDFResumeDocument = ({ data, template = 'axis' }: PDFResumeDocumentProps) => (
  <Document title={`${data.personal.name || 'Resume'} - Resume`} author={data.personal.name || undefined}>
    <Page size="A4" style={[
      styles.page,
      template === 'ats' ? styles.atsPage : undefined,
      template === 'classic' ? styles.classicPage : undefined,
      template === 'compact' ? styles.compactPage : undefined,
      template === 'sidebar' ? styles.sidebarPage : undefined,
      template === 'minimal' ? styles.minimalPage : undefined,
    ]} wrap>
      {template === 'ats' ? <PDFAtsHeader data={data} /> : <PDFHeader data={data} template={template} />}
      {template === 'ats' ? <PDFAtsContent data={data} /> : template === 'sidebar' ? <PDFSidebarContent data={data} /> : <PDFStandardContent data={data} template={template} />}
    </Page>
  </Document>
)
