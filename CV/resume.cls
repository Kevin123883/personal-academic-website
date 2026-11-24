% resume.cls — a plain, one-column résumé/CV class.
%
% Modelled on the widely used "resume.cls" (Trey Hunner's Medium Length
% Professional CV): centred upper-case name, address lines joined by a
% diamond, and upper-case section headings over a full-width rule.
%
% Usage (see cv.tex):
%   \documentclass{resume}
%   \name{Your Name}
%   \address{Line one part \\ another part}   % up to three \address lines;
%   \address{Phone \\ Email}                   % "\\" prints as a diamond
%   \begin{document}
%   \begin{rSection}{Education} ... \end{rSection}

\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}[2026/11/24 Resume class]

\LoadClass[11pt,letterpaper]{article}

\RequirePackage[parfill]{parskip} % no paragraph indent, space between paragraphs
\RequirePackage{array}
\RequirePackage{ifthen}

\pagestyle{empty} % no page numbers

%-------------------------------------------------------------------------------
% Header: \name and up to three \address lines
%-------------------------------------------------------------------------------
\def\name#1{\def\@name{#1}}
\def\@name{}

\def\addressSep{$\diamond$}

\newcounter{rAddress}
\def\address#1{%
  \stepcounter{rAddress}%
  \expandafter\def\csname @address\roman{rAddress}\endcsname{#1}%
}

\def\printaddress#1{%
  \begingroup
    \def\\{\ \addressSep\ }%
    \centerline{#1}%
  \endgroup
  \par
  \addressskip
}

\def\printname{%
  \centerline{\namesize\bfseries\MakeUppercase{\@name}}%
  \par\nameskip
}

% Print the name and addresses automatically at \begin{document}.
\AtBeginDocument{%
  \printname
  \@ifundefined{@addressi}{}{\printaddress{\@addressi}}%
  \@ifundefined{@addressii}{}{\printaddress{\@addressii}}%
  \@ifundefined{@addressiii}{}{\printaddress{\@addressiii}}%
}

%-------------------------------------------------------------------------------
% Sections
%-------------------------------------------------------------------------------
% \begin{rSection}{Heading} ... \end{rSection}
\newenvironment{rSection}[1]{%
  \sectionskip
  \MakeUppercase{\bfseries #1}%
  \sectionlineskip
  \hrule
  \begin{list}{}{\setlength{\leftmargin}{1.5em}}%
  \item[]
}{%
  \end{list}%
}

% \begin{rSubsection}{Bold left}{Right}{Italic left}{Italic right} items... \end{rSubsection}
\newenvironment{rSubsection}[4]{%
  {\bfseries #1} \hfill {#2}%
  \ifthenelse{\equal{#3}{}}{}{\\ {\em #3} \hfill {\em #4}}%
  \smallskip
  \begin{list}{$\cdot$}{\leftmargin=0em}%
  \itemsep -0.5em \vspace{-0.5em}%
}{%
  \end{list}%
  \vspace{0.5em}%
}

%-------------------------------------------------------------------------------
% Spacing
%-------------------------------------------------------------------------------
\def\namesize{\huge}
\def\addressskip{\smallskip}
\def\sectionlineskip{\medskip}
\def\nameskip{\bigskip}
\def\sectionskip{\medskip}
