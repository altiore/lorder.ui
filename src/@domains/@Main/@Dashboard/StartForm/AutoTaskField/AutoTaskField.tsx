import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import deburr from 'lodash-es/deburr';
import React from 'react';
import Autosuggest from 'react-autosuggest';
import { WrappedFieldProps } from 'redux-form';

import { Project } from '@store/projects';
import { ITask } from '@types';
import Suggestion from './Suggestion';

export interface IAutoTaskFieldProps extends WrappedFieldProps {
  classes: any;
  getProjectById: any;
  onSelect: (task: Partial<ITask>) => any;
  label: string;
  projectId: number;
  projects: Project[];
  suggestions: ITask[];
}

export interface IAutoTaskFieldState {
  suggestions: Array<Partial<ITask>>;
}

export class AutoTaskFieldTsx extends React.Component<IAutoTaskFieldProps, IAutoTaskFieldState> {
  popperNode: HTMLElement;

  constructor(props: IAutoTaskFieldProps) {
    super(props);
    this.state = {
      suggestions: [],
    };
  }

  handleSuggestionsFetchRequested = ({ value }: any) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event: any, { newValue }: any) => {
    this.props.input.onChange(newValue);
  };

  render() {
    const { classes, input, label } = this.props;
    const { suggestions } = this.state;
    const isOpen = Boolean(suggestions.length);

    return (
      <div className={classes.root}>
        {isOpen && <div className={classes.overlay} />}
        <Autosuggest
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          suggestions={suggestions as any}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderInputComponent={this.renderInputComponent}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          onSuggestionSelected={this.handleSuggestSelected}
          inputProps={{
            InputLabelProps: {
              shrink: true,
            },
            classes,
            inputRef: (node: HTMLElement) => {
              this.popperNode = node;
            },
            onChange: this.handleChange,
            placeholder: label,
            value: input.value,
          }}
          theme={{
            suggestion: classes.suggestion,
            suggestionsList: classes.suggestionsList,
          }}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
        />
      </div>
    );
  }

  private renderSuggestionsContainer = (options: any) => {
    const { classes } = this.props;
    const isOpen = Boolean(options.children);
    return (
      <Popper
        anchorEl={this.popperNode}
        open={isOpen}
        placement="bottom"
        modifiers={{
          flip: {
            enabled: false,
          },
        }}
        style={{ zIndex: 1301 }}
      >
        <Paper
          square
          {...options.containerProps}
          style={{ width: this.popperNode ? this.popperNode.clientWidth : 'none' }}
          className={classes.popperPaper}
        >
          {options.children}
        </Paper>
      </Popper>
    );
  };

  private shouldRenderSuggestions() {
    return true;
  }

  private handleSuggestSelected = async (e: React.FormEvent, data: Autosuggest.SuggestionSelectedEventData<ITask>) => {
    await this.props.onSelect(data.suggestion);
  };

  private renderSuggestion = (suggestion: ITask, { query, isHighlighted }: any) => {
    const project = this.props.getProjectById(suggestion.projectId);
    return <Suggestion task={suggestion} selected={isHighlighted} query={query} project={project} />;
  };

  private renderInputComponent = (inputProps: any) => {
    const { classes, inputRef = Function.prototype, ref, ...other } = inputProps;
    const {
      classes: globalClasses,
      meta: { error, touched },
    } = this.props;

    const isOpen = Boolean(this.state.suggestions.length);
    return (
      <TextField
        fullWidth
        variant="outlined"
        error={touched && !!error}
        helperText={touched && error}
        InputProps={{
          classes: {
            input: classes.input,
          },
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          style: {
            backgroundColor: isOpen ? '#fff' : 'transparent',
            borderRadius: 4,
            zIndex: isOpen ? 1305 : 'auto',
          },
        }}
        FormHelperTextProps={{ classes: { error: globalClasses.inputError } }}
        {...other}
      />
    );
  };

  private getSuggestionValue(suggestion: ITask) {
    return suggestion.title;
  }

  private getSuggestions = (value: any) => {
    const inputValue = deburr(value ? value.trim() : '').toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    if (!inputValue) {
      return this.props.suggestions;
    }

    const suggestions =
      inputLength === 0
        ? []
        : this.props.suggestions.filter(suggestion => {
            const keep = count < 5 && ~suggestion.title.toLowerCase().indexOf(inputValue);

            if (keep) {
              count += 1;
            }

            return keep;
          });
    this.props.projects.forEach(project => {
      const suggested: Partial<ITask> = {
        sequenceNumber: 0,
        projectId: project.id,
        title: value,
      };
      suggestions.unshift(suggested as ITask);
    });
    return suggestions;
  };
}
